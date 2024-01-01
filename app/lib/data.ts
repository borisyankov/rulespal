"use server";

import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function searchFor(query: string) {
  const embeddings = new OpenAIEmbeddings();
  const vector = await embeddings.embedQuery(query);
  const results = await sql.query(
    "SELECT * FROM embeddings ORDER BY embedding <-> $1 LIMIT 5",
    [pgvector.toSql(vector)],
  );
  // where bggId = bggId
  console.log(results);
  return results.rows[0];
}
