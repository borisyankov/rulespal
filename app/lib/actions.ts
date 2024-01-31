import OpenAI from 'openai';
import { cosineSimilarity } from './rag';
import { getPrompt } from '../api/chat/prompt';
import games from '@/data/games';
import { EmbeddingsStatic } from './definitions';

const openai = new OpenAI();

export const runtime = 'edge';

export async function getEmbedding(text: string): Promise<number[]> {
  const embeddingResponse = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-3-small',
  });
  return embeddingResponse.data[0].embedding;
}

export async function searchFor(query: string, bggid: number) {
  const game = games.find((x) => x.bggid === bggid);
  if (!game) {
    return "Game not found";
  }
  const gameEmbeddings = (await import(`../../data/embeddings/${game.code}_embeddings.json`)).default as EmbeddingsStatic[];
  const queryEmbedding = await getEmbedding(query);
  console.time('Search all embeddings');
  const cosine = gameEmbeddings.map((x) => ({
    ...x,
    similarity: cosineSimilarity(x.embedding, queryEmbedding),
  }));
  cosine.sort((a, b) => b.similarity - a.similarity);
  console.timeEnd('Search all embeddings');
  
  const topFive = cosine.slice(0, 5);
  const rulesExcerpt = topFive.map((x, i) => `${x.chunk} 【${i}†source】`).join('\n');
  return getPrompt(rulesExcerpt, game.name);
}
