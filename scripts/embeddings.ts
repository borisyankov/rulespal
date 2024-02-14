import fs from 'fs';
import OpenAI from "openai";
import { splitText } from '../app/lib/rag';
import games from '../data/games';
import { Game } from '@/app/lib/definitions';

const openai = new OpenAI();

async function docToEmbeddings(rulebookFile: string, embeddingFile: string) {
  const docs = fs.readFileSync(rulebookFile, 'utf-8');
  const chunks = await splitText(docs, 2000, 10);
  const embeddingResponse = await openai.embeddings.create({
    input: chunks.map(x => x.text),
    model: 'text-embedding-3-small',
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
}

async function processRulebook(game: Game) {
  const outputFilename = `../data/embeddings/${game.code}_embeddings.json`;
  if (fs.existsSync(outputFilename)) {
    console.log(`Skipping ${game.code}`);
    return;
  }

  console.log(`Processing ${game.code}`);
  const rulebookFilename = `../data/rulebooks/${game.code}_rulebook.md`;
  docToEmbeddings(rulebookFilename, outputFilename);
}

async function processAllRulebooks(games: Game[]): Promise<void> {
  for (const game of games) {
    processRulebook(game);
  }
}

processAllRulebooks(games);
