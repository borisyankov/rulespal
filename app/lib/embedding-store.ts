import type { EmbeddingSet } from './definitions';

// Embedding files are served as static assets from `public/embeddings/` and
// fetched at request time, rather than imported.
//
// The obvious `await import(`../../data/embeddings/${code}-embeddings.json`)`
// cannot be resolved at build time, so the bundler conservatively pulls *every*
// game's file into the `api/chat` function. At 789 games that was 318 MB of
// vectors in a function that may not exceed 250 MB. Fetching keeps the function
// flat no matter how many games the catalog grows to.
//
// The files hold only chunk offsets and vectors — no rulebook text — so serving
// them from a public URL exposes nothing the app doesn't already render.

// Warm instances answer repeat questions about the same game without refetching.
// Capped because the whole corpus is far larger than a function's memory.
const MAX_CACHED_GAMES = 8;
const cache = new Map<string, EmbeddingSet[]>();

function readCache(code: string): EmbeddingSet[] | undefined {
  const hit = cache.get(code);
  if (!hit) return undefined;
  // Re-insert so eviction below is least-recently-used, not insertion-ordered.
  cache.delete(code);
  cache.set(code, hit);
  return hit;
}

function writeCache(code: string, embeddings: EmbeddingSet[]): void {
  cache.set(code, embeddings);
  while (cache.size > MAX_CACHED_GAMES) {
    cache.delete(cache.keys().next().value as string);
  }
}

// Preview deployments sit behind Vercel's deployment protection, which the
// browser satisfies with a cookie the function's own fetch doesn't carry.
function assetHeaders(): HeadersInit | undefined {
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  return bypass ? { 'x-vercel-protection-bypass': bypass } : undefined;
}

export async function loadEmbeddings(
  code: string,
  origin: string,
): Promise<EmbeddingSet[]> {
  const cached = readCache(code);
  if (cached) return cached;

  const base = process.env.EMBEDDINGS_BASE_URL ?? origin;
  const url = `${base.replace(/\/$/, '')}/embeddings/${code}-embeddings.json`;
  // Next's fetch cache tops out well below the largest of these files, so the
  // in-process cache above is the only layer worth going through.
  const response = await fetch(url, {
    headers: assetHeaders(),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(
      `Failed to load embeddings for ${code}: ${response.status} ${response.statusText}`,
    );
  }
  // A path with no file behind it falls through to the `[...code]` catch-all,
  // which answers with an HTML page — so an OK status alone doesn't mean the
  // asset exists. Without this check the miss surfaces as a JSON syntax error.
  if (!response.headers.get('content-type')?.includes('json')) {
    throw new Error(`No embeddings published for ${code} at ${url}`);
  }

  const embeddings = (await response.json()) as EmbeddingSet[];
  writeCache(code, embeddings);
  return embeddings;
}
