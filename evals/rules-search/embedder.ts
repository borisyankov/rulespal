import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Must match the query embedding in app/lib/actions.ts — a query embedded with
// a different model or width is not comparable to the stored chunk vectors.
// runEval() cross-checks the width against the corpus before scoring anything.
const MODEL = 'text-embedding-3-large';
const DIMENSIONS = 512;

const CACHE_FILE = path.join(__dirname, 'query-embeddings.json');

type Cache = {
  model: string;
  dimensions: number;
  // sha1 of the question text -> its embedding.
  vectors: Record<string, number[]>;
};

function emptyCache(): Cache {
  return { model: MODEL, dimensions: DIMENSIONS, vectors: {} };
}

function readCache(): Cache {
  if (!fs.existsSync(CACHE_FILE)) return emptyCache();
  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as Cache;
  // A cache from another model says nothing about this one.
  return cache.model === MODEL && cache.dimensions === DIMENSIONS
    ? cache
    : emptyCache();
}

function key(text: string): string {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export type Embedder = {
  embed: (text: string) => Promise<number[]>;
  // Number of questions that had to be embedded over the network this run.
  misses: () => number;
  save: () => void;
};

// Questions are fixed, so their embeddings are too. Caching them next to the
// dataset keeps repeat runs free, deterministic, and possible without an API
// key at all; the cache is keyed on the question text, so editing a question
// re-embeds only that one.
export function createEmbedder(offline = false): Embedder {
  const cache = readCache();
  let misses = 0;
  let client: OpenAI | null = null;

  return {
    async embed(text: string): Promise<number[]> {
      const cached = cache.vectors[key(text)];
      if (cached) return cached;
      if (offline) {
        throw new Error(
          `No cached embedding for ${JSON.stringify(text)}. Re-run without --offline to fetch it.`,
        );
      }
      if (!process.env.OPENAI_API_KEY) {
        throw new Error(
          'OPENAI_API_KEY is not set, and this question is not in query-embeddings.json.',
        );
      }
      client ??= new OpenAI();
      const response = await client.embeddings.create({
        input: text,
        model: MODEL,
        dimensions: DIMENSIONS,
      });
      misses++;
      const embedding = response.data[0].embedding;
      cache.vectors[key(text)] = embedding;
      return embedding;
    },
    misses: () => misses,
    save() {
      if (misses === 0) return;
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf-8');
    },
  };
}

export const EMBEDDING_DIMENSIONS = DIMENSIONS;
