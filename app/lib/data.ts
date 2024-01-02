"use server";

import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI();

export async function searchFor(query: string) {
  const embeddingResponse = await openai.embeddings.create({
    input: query,
    model: 'text-embedding-ada-002',
  })
  const embedding = embeddingResponse.data[0].embedding;
  const qslResults = await sql.query(
    "SELECT * FROM embeddings ORDER BY embedding <-> $1 LIMIT 5",
    [pgvector.toSql(embedding)],
  );
  // where bggId = bggId
  return qslResults.rows;
}
