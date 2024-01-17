"use server";

import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import OpenAI from "openai";
import { EmbeddingBrief, EmbeddingDetails, Game } from "./definitions";
import { splitText } from "./rag";

const openai = new OpenAI();

export async function docToEmbeddings(docs: string) {
  // const docs = await readPDFFile(filename);
  const chunks = await splitText(docs, 1000, 200);
  console.log(JSON.stringify(chunks, null, 2));
  const embeddingResponse = await openai.embeddings.create({
    input: chunks,
    model: 'text-embedding-ada-002',
  });
  const vectors = embeddingResponse.data[0].embedding;
  console.log(vectors);
  return { chunks, vectors };
}

export async function createEmbeddings(
  bggId: number,
  source: string,
  chunks: Document[],
  embeddings: number[][]
) {
  try {
    for (let i = 0; i < chunks.length; i++) {
      await sql.query(
        "INSERT INTO embeddings (bggId, source, content, embedding) VALUES ($1, $2, $3, $4)",
        [bggId, source, chunks[i], pgvector.toSql(embeddings[i])]
      );
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Embeddings.",
    };
  }
}

export async function fetchGames(): Promise<Game[]> {
  const games = await sql<Game>`SELECT * from games`;
  return games.rows;
}

export async function fetchGameById(id: string) {
  try {
    const data = await sql<Game>`
      SELECT *
      FROM games
      WHERE id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch game.');
  }
}

export async function fetchEmbeddingsById(bggid: string) {
  try {
    const data = await sql<EmbeddingBrief>`
      SELECT g.name as gamename, g.bggId, MIN(e.source) AS source
      FROM games g
      INNER JOIN embeddings e ON g.bggId = e.bggId
      WHERE g.bggId = ${bggid}
      GROUP BY g.name, g.bggId;
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch embeddings.');
  }
}

export async function fetchEmbeddingsDetailsById(bggid: string): Promise<Record<string, EmbeddingDetails[]>> {
  try {
    const data = await sql<EmbeddingDetails>`
      SELECT 
        g.name as gamename, 
        g.bggId, 
        e.source AS source, 
        e.content AS content, 
        e.embedding AS embedding
      FROM games g
      INNER JOIN embeddings e ON g.bggId = e.bggId
      WHERE g.bggId = ${bggid};
    `;
    const groupedData = data.rows.reduce((acc, row) => {
      if (!acc[row.source]) {
        acc[row.source] = [];
      }
      acc[row.source].push(row);
      return acc;
    }, {} as Record<string, EmbeddingDetails[]>);
    return groupedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch embeddings details.');
  }
}

