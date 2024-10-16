import OpenAI from 'openai';
import { cosineSimilarity } from './rag';
import { getPrompt } from '../api/chat/prompt';
import games from '@/data/games';
import type { Citation, EmbeddingSet, Game } from './definitions';
import dict from '../../data/dict';

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

function findOOVs(dict: string[], query: string) {
  const words = query.match(/[a-zA-Z]+/g) || [];
  const lowerCaseDict = dict.map((word) => word.toLowerCase());
  const OOVs = words.filter(
    (word) => !lowerCaseDict.includes(word.toLowerCase()),
  );
  return OOVs;
}

function getOovCount(content: string, OOVs: string[]) {
  const lowerContent = content.toLowerCase();
  const count = OOVs.map((oov) =>
    lowerContent.includes(oov.toLowerCase()),
  ).filter((x) => x).length;
  return count;
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
  const [rulebook, gameEmbeddings, queryEmbedding] = await loadData(
    game,
    query,
  );
  console.timeEnd('Load rulebook, embeddings, embeddings for query');

  const OOVs = findOOVs(dict, query);
  if (OOVs.length === 0) {
    console.log('No OOVs found!');
  } else {
    console.log('OOVs found: ', OOVs);
  }

  console.time('Search all embeddings');
  const cosine = gameEmbeddings.map((x) => {
    const content = rulebook.substring(x.start, x.start + x.length);
    const cosine = cosineSimilarity(x.embedding, queryEmbedding);
    const oovCount = getOovCount(content, OOVs);
    return {
      ...x,
      content,
      similarity: cosine + oovCount * 0.2,
    };
  });
  cosine.sort((a, b) => b.similarity - a.similarity);
  console.timeEnd('Search all embeddings');

  const topFive = cosine.slice(0, 5);
  const rulesExcerpt = topFive
    .map((x, i) => rulebook.substring(x.start, x.start + x.length))
    .join('\n');
  return {
    system: getPrompt(rulesExcerpt, game.name),
    citations: topFive.map((x) => ({
      start: x.start,
      length: x.length,
      content: x.content,
    }))
  };
}
