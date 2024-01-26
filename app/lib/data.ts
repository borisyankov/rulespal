import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import { Redis } from "@upstash/redis";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI();

const redis = new Redis({
  url: "https://us1-rational-prawn-40635.upstash.io",
  token:
    "AZ67ACQgNjQ0NDQyOTItNGE3Mi00MDMzLTg1YTQtNTIyOWVmZDgzYzhkYTc1YmU4ODQyYzFjNDc0NjgyMGY5MzU2Nzk0ZjM3NGU=",
});

export const runtime = "edge";

export async function getEmbedding(text: string): Promise<number[]> {
  console.time("HSET");
  await redis.hset("foo", { a: "b" });
  console.timeEnd("HSET");
  console.time("HGET");
  await redis.hget("foo", "a");
  console.timeEnd("HGET");
  console.time("HSET");
  await redis.hset("foo", { a: "b" });
  console.timeEnd("HSET");
  console.time("HGET");
  await redis.hget("foo", "a");
  console.timeEnd("HGET");
  console.time("REDIS HGET");
  const cachedEmbedding = await redis.hget("embeddings", text);
  console.timeEnd("REDIS HGET");
  if (cachedEmbedding) {
    return cachedEmbedding as number[];
  }
  console.time("openai.embeddings.create");
  const embeddingResponse = await openai.embeddings.create({
    input: text,
    model: "text-embedding-3-small",
  });
  console.timeEnd("openai.embeddings.create");
  const embedding = embeddingResponse.data[0].embedding;
  console.time("REDIS HSET");
  await redis.hset("embeddings", { [text]: embedding });
  console.timeEnd("REDIS HSET");
  return embedding;
}

export async function searchFor(query: string) {
  const embedding = await getEmbedding(query);
  console.time("postgres embedding <=> $1 LIMIT 5");
  const qslResults = await sql.query(
    "SELECT * FROM embeddings ORDER BY embedding <=> $1 LIMIT 5",
    [pgvector.toSql(embedding)],
  );
  console.timeEnd("postgres embedding <=> $1 LIMIT 5");
  // where bggId = bggId
  return qslResults.rows;
}
