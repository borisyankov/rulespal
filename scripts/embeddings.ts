import fs from 'fs';
import path from 'path';
import OpenAI from "openai";
import { splitText } from '../app/lib/rag';
import games from '../data/games';

const openai = new OpenAI();
const projectRoot = path.resolve(__dirname, '..');

// Usage:
//   npm run embeddings                  every catalog game missing an embeddings file
//   npm run embeddings -- azul dominion  just those codes, read straight off their
//                                        rulebook files — so a game can be embedded
//                                        before its data/games.ts entry exists
//   npm run embeddings -- azul --force   regenerate even if the file is already there
function parseArgs(argv: string[]): { codes: string[]; force: boolean } {
  return {
    codes: argv.filter((arg) => !arg.startsWith('--')),
    force: argv.includes('--force'),
  };
}

async function docToEmbeddings(
  rulebookFile: string,
  embeddingFile: string,
): Promise<number> {
  const docs = fs.readFileSync(rulebookFile, 'utf-8');
  const chunks = await splitText(docs, 1000, 100);
  const embeddingResponse = await openai.embeddings.create({
    input: chunks.map(x => x.text),
    model: 'text-embedding-3-large',
    dimensions: 512,
  });
  const embeddingObject = chunks.map((chunk, index) => {
    return {
      start: chunk.offset,
      length: chunk.text.length,
      embedding: embeddingResponse.data[index].embedding
    };
  });
  fs.writeFileSync(embeddingFile, JSON.stringify(embeddingObject, null, 2), 'utf-8');
  return chunks.length;
}

// Returns 'skipped' | the chunk count written, and throws on failure.
async function processCode(
  code: string,
  force: boolean,
): Promise<'skipped' | number> {
  const outputFilename = `${projectRoot}/data/embeddings/${code}-embeddings.json`;
  if (fs.existsSync(outputFilename) && !force) return 'skipped';

  const rulebookFilename = `${projectRoot}/data/rulebooks/${code}-rulebook.md`;
  if (!fs.existsSync(rulebookFilename)) {
    throw new Error(`no rulebook at data/rulebooks/${code}-rulebook.md`);
  }

  console.log(`Processing ${code}`);
  return await docToEmbeddings(rulebookFilename, outputFilename);
}

async function processCodes(codes: string[], force: boolean): Promise<void> {
  const created: string[] = [];
  const failed: { code: string; reason: string }[] = [];

  // Sequential: one embeddings request at a time keeps failures attributable
  // and stays clear of OpenAI's rate limits on a big batch.
  for (const code of codes) {
    try {
      const result = await processCode(code, force);
      if (result !== 'skipped') {
        created.push(code);
        console.log(`  ${code}: ${result} chunks`);
      }
    } catch (error) {
      failed.push({ code, reason: (error as Error).message });
    }
  }

  console.log(`\nDone. ${created.length} created, ${failed.length} failed.`);
  if (failed.length) {
    for (const { code, reason } of failed) console.log(`  - ${code}: ${reason}`);
    process.exitCode = 1;
  }
}

const { codes, force } = parseArgs(process.argv.slice(2));

if (codes.length) {
  // Explicit codes need no catalog entry — that's the point of this mode — but
  // a typo'd code looks identical to a not-yet-added game, so say which it is.
  const known = new Set(games.map((game) => game.code));
  const unlisted = codes.filter((code) => !known.has(code));
  if (unlisted.length) {
    console.log(`Not (yet) in data/games.ts: ${unlisted.join(', ')}\n`);
  }
  processCodes(codes, force);
} else {
  processCodes(games.map((game) => game.code), force);
}
