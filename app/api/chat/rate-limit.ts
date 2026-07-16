// Best-effort in-memory rate limiter.
//
// This lives in module state, so it only protects a single warm serverless
// instance and resets on cold starts. It's a cheap first line of defence
// against a client hammering the paid embedding/LLM APIs; a production
// deployment behind multiple instances should back this with a shared store
// (Upstash / Vercel KV / Redis).

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

const hits = new Map<string, number[]>();

export function clientKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
