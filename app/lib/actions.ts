import OpenAI from 'openai';
import { cosineSimilarity } from './rag';
import { getPrompt } from '../api/chat/prompt';
import games from '@/data/games';
import type { EmbeddingSet } from './definitions';

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

export async function searchFor(query: string, bggid: number): Promise<SearchForResponse> {
  const game = games.find((x) => x.bggid === bggid);
  if (!game) {
    throw "Game not found";
  }
  const [rulebook, gameEmbeddings] = await Promise.all([
    import(`../../data/rulebooks/${game.code}_rulebook.md`).then((module) => module.default as string),
    import(`../../data/embeddings/${game.code}_embeddings.json`).then((module) => module.default as EmbeddingSet[])
  ]);
  const queryEmbedding = await getEmbedding(query);
  console.time('Search all embeddings');
  const cosine = gameEmbeddings.map((x) => ({
    ...x,
    content: rulebook.substring(x.start, x.start + x.length),
    similarity: cosineSimilarity(x.embedding, queryEmbedding),
  }));
  cosine.sort((a, b) => b.similarity - a.similarity);
  console.timeEnd('Search all embeddings');
  const topFive = cosine.slice(0, 5);
  const rulesExcerpt = topFive.map((x, i) => rulebook.substring(x.start, x.start + x.length)).join('\n');
  return {
    prompt: getPrompt(rulesExcerpt, game.name),
    embeddings: topFive,
  };
}