import fs from 'fs';
import OpenAI from "openai";
import { splitText } from '../app/lib/rag';

const openai = new OpenAI();

function readFileAsText(filename: string): string {
  try {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return '';
  }
}

function writeStringToFile(filename: string, content: string): void {
  try {
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`Successfully wrote to file: ${filename}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
}

export async function docToEmbeddings(filename: string) {
  console.log(`Reading rulebook: ${filename}`);
  console.time('Read complete');
  const docs = readFileAsText(filename);
  console.timeEnd('Read complete');

  console.log('Splitting text...');
  console.time('Split complete');
  const chunks = await splitText(docs, 1000, 200);
  console.timeEnd('Split complete');
  console.log('Chunks: ', chunks.length);


  console.log('Creating embeddings...');
  console.time('Embeddings created');
  const embeddingResponse = await openai.embeddings.create({
    input: chunks,
    model: 'text-embedding-3-small',
  });
  console.timeEnd('Embeddings created');

  const embeddingObject = chunks.map((chunk, index) => {
    return {
      chunk,
      embedding: embeddingResponse.data[index].embedding
    };
  });

  console.log('Writing embeddings...');
  console.time('Write complete');
  writeStringToFile('vectors.json', JSON.stringify(embeddingObject, null, 2));
  console.timeEnd('Write complete');
}

docToEmbeddings('../data/rulebooks/everdell_rulebook.md');