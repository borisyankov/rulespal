"use server";

import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import { kv } from '@vercel/kv';
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI();

export async function getEmbedding(text: string): Promise<number[]> {
  const cachedEmbedding = await kv.hget('embeddings', text);
  if (cachedEmbedding) {
    return cachedEmbedding as number[];
  }
  const embeddingResponse = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-ada-002',
  })
  const embedding = embeddingResponse.data[0].embedding;
  kv.hset('embeddings', { [text]: embedding });
  return embedding;
}

export async function searchFor(query: string) {
  const embedding = await getEmbedding(query);
  const qslResults = await sql.query(
    "SELECT * FROM embeddings ORDER BY embedding <=> $1 LIMIT 5",
    [pgvector.toSql(embedding)],
  );
  // where bggId = bggId
  return qslResults.rows;
}
