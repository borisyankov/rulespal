import OpenAI from 'openai';
import { BM25Index, Retriever, VectorIndex } from './retriever';
import { getPrompt } from '../api/chat/prompt';
import games from '@/data/games';
import type { Citation, EmbeddingSet, Game } from './definitions';

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
  system: string;
  citations: Citation[];
};

async function time<T>(
  log: string,
  asyncFunction: () => Promise<T>,
): Promise<T> {
  console.time(log);
  try {
    return await asyncFunction();
  } finally {
    console.timeEnd(log);
  }
}

type AnswerData = [string, EmbeddingSet[], number[]];

async function loadData(
  game: Game,
  query: string,
): Promise<AnswerData> {
  const loadRulebook = async () => {
    const m = await import(`../../data/rulebooks/${game.code}-rulebook.md`);
    return m.default as string;
  };
  const loadEmbeddings = async () => {
    const m = await import(
      `../../data/embeddings/${game.code}-embeddings.json`
    );
    return m.default as EmbeddingSet[];
  };
  const getEmbeddingsForQuery = async () => await getEmbedding(query);

  return await time<AnswerData>('Load all data', () => Promise.all([
    time<string>('Load rulebook', loadRulebook),
    time<EmbeddingSet[]>('Load embeddings', loadEmbeddings),
    time<number[]>('Get embeddings for query', getEmbeddingsForQuery),
  ]));
}

export async function searchFor(
  query: string,
  bggid: number,
): Promise<SearchForResponse> {
  const game = games.find((x) => x.bggid === bggid);
  if (!game) {
    throw new Error('Game not found');
  }

  console.time('Load rulebook, embeddings, embeddings for query');
  const [rulebook, gameEmbeddings, queryEmbedding] = await loadData(
    game,
    query,
  );
  console.timeEnd('Load rulebook, embeddings, embeddings for query');

  // Hybrid retrieval: fuse semantic (vector) and lexical (BM25) rankings.
  // The query embedding was fetched in parallel with the file loads above, so
  // the vector index just hands it back rather than embedding again.
  const chunks = gameEmbeddings.map((x) => ({
    ...x,
    content: rulebook.substring(x.start, x.start + x.length),
  }));

  console.time('Search all embeddings');
  const vectorIndex = new VectorIndex<(typeof chunks)[number]>(
    async () => queryEmbedding,
  );
  const bm25Index = new BM25Index<(typeof chunks)[number]>();
  // Each chunk is unique by its offset in the rulebook; key fusion on it so
  // the same chunk from both indexes is recognized as one document.
  const retriever = new Retriever(
    [vectorIndex, bm25Index],
    (chunk) => String(chunk.start),
  );
  for (const chunk of chunks) {
    retriever.addDocument(chunk);
  }
  const results = await retriever.search(query, 5);
  console.timeEnd('Search all embeddings');

  const topFive = results.map((result) => result.document);
  const rulesExcerpt = topFive.map((x) => x.content).join('\n');
  return {
    system: getPrompt(rulesExcerpt, game.name),
    citations: topFive.map((x) => ({
      start: x.start,
      length: x.length,
      content: x.content,
    }))
  };
}
