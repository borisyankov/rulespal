import OpenAI from 'openai';
import { cosineSimilarity } from './rag';
import { getPrompt } from '../api/chat/prompt';
import games from '@/data/games';
import type { EmbeddingSet, Game } from './definitions';
import fs from 'node:fs';

const openai = new OpenAI();

export const runtime = 'edge';

export async function getEmbedding(text: string): Promise<number[]> {
  const embeddingResponse = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-3-large',
    dimensions: 512,
  });
  return embeddingResponse.data[0].embedding;
}

type SearchForResponse = {
  prompt: string;
  embeddings: EmbeddingSet[];
};

async function timeThis<T>(
  log: string,
  asyncFunction: () => Promise<T>,
): Promise<T> {
  console.time(log);
  try {
    return await asyncFunction();
  }
  finally {
    console.timeEnd(log);
  }
}

export const loadFileAsArray = () =>{
  try {
    const fileContent = fs.readFileSync('../../data/dict.dic', 'utf8');
    const array = fileContent.trim().split('\n');
    return array;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadData(game: Game, query: string): Promise<[string[], string, EmbeddingSet[], number[]]> {
  return await Promise.all([
    timeThis<string[]>("Load dictionary", async () => {
      return loadFileAsArray();
    }),
    timeThis<string>("Load rulebook", async () => {
      const m = await import(`../../data/rulebooks/${game.code}-rulebook.md`);
      return m.default as string;
    }),
    timeThis<EmbeddingSet[]>("Load embeddings", async () => {
      const m = await import(`../../data/embeddings/${game.code}-embeddings.json`)
      return m.default as EmbeddingSet[];
    }),
    timeThis<number[]>("Get embeddings for query", async () => {
      return await getEmbedding(query);
    }),
  ]);
}

export async function searchFor(
  query: string,
  bggid: number,
): Promise<SearchForResponse> {
  const game = games.find((x) => x.bggid === bggid);
  if (!game) {
    throw 'Game not found';
  }

  console.time('Load rulebook, embeddings, embeddings for query');
  const [dict, rulebook, gameEmbeddings, queryEmbedding] = await loadData(game, query);
  console.timeEnd('Load rulebook, embeddings, embeddings for query');
  
  console.time('Search all embeddings');
  const cosine = gameEmbeddings.map((x) => ({
    ...x,
    content: rulebook.substring(x.start, x.start + x.length),
    similarity: cosineSimilarity(x.embedding, queryEmbedding),
  }));
  cosine.sort((a, b) => b.similarity - a.similarity);
  console.timeEnd('Search all embeddings');

  const topFive = cosine.slice(0, 5);
  const rulesExcerpt = topFive
    .map((x, i) => rulebook.substring(x.start, x.start + x.length))
    .join('\n');
  return {
    prompt: getPrompt(rulesExcerpt, game.name),
    embeddings: topFive,
  };
}
