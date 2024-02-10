import fs from 'fs';
import OpenAI from "openai";
import { splitText } from '../app/lib/rag';
import games from '../data/games';

const openai = new OpenAI();

async function docToEmbeddings(rulebookFile: string, embeddingFile: string) {
  console.log(`Reading rulebook: ${rulebookFile}`);
  console.time('Read complete');
  const docs = fs.readFileSync(rulebookFile, 'utf-8');
  console.timeEnd('Read complete');

  console.log('Splitting text...');
  console.time('Split complete');
  const chunks = await splitText(docs, 2000, 10);
  console.timeEnd('Split complete');
  console.log('Chunks: ', chunks.length);

  console.log('Creating embeddings...');
  console.time('Embeddings created');
  const embeddingResponse = await openai.embeddings.create({
    input: chunks.map(x => x.text),
    model: 'text-embedding-3-small',
    dimensions: 512,
  });
  console.timeEnd('Embeddings created');

  const embeddingObject = chunks.map((chunk, index) => {
    return {
      start: chunk.offset,
      length: chunk.text.length,
      embedding: embeddingResponse.data[index].embedding
    };
  });

  console.log(`Writing embeddings to ${embeddingFile}`);
  console.time('Write complete');
  fs.writeFileSync(embeddingFile, JSON.stringify(embeddingObject, null, 2), 'utf-8');
  console.timeEnd('Write complete');
}

async function processAllRulebooks() {
  for (const game of games) {
    const rulebookFile = `../data/rulebooks/${game.code}_rulebook.md`;
    const embeddingFile = `./embeddings/${game.code}_embeddings.json`;
    docToEmbeddings(rulebookFile, embeddingFile);
  }
}

processAllRulebooks();
