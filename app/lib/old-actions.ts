"use server";

import { Redis } from '@upstash/redis';
import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import OpenAI from "openai";
import { EmbeddingBrief, EmbeddingDetails, Game } from "./definitions";
import { splitText } from "./rag";

const openai = new OpenAI();

const redis = new Redis({
  url: 'https://us1-rational-prawn-40635.upstash.io',
  token:
    'AZ67ACQgNjQ0NDQyOTItNGE3Mi00MDMzLTg1YTQtNTIyOWVmZDgzYzhkYTc1YmU4ODQyYzFjNDc0NjgyMGY5MzU2Nzk0ZjM3NGU=',
});

export async function docToEmbeddings(docs: string) {
  // const docs = await readPDFFile(filename);
  const chunks = await splitText(docs, 1000, 200);
  console.log(JSON.stringify(chunks, null, 2));
  const embeddingResponse = await openai.embeddings.create({
    input: chunks,
    model: 'text-embedding-3-small',
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

export async function getEmbedding(text: string): Promise<number[]> {
  console.time('REDIS HGET');
  const cachedEmbedding = await redis.hget('embeddings', text);
  console.timeEnd('REDIS HGET');
  if (cachedEmbedding) {
    return cachedEmbedding as number[];
  }
  console.time('openai.embeddings.create');
  const embeddingResponse = await openai.embeddings.create({
    input: text,
    model: 'text-embedding-3-small',
  });
  console.timeEnd('openai.embeddings.create');
  const embedding = embeddingResponse.data[0].embedding;
  console.time('REDIS HSET');
  await redis.hset('embeddings', { [text]: embedding });
  console.timeEnd('REDIS HSET');
  return embedding;
}

export async function searchForPostgres(query: string) {
  const embedding = await getEmbedding(query);
  console.time('postgres embedding <=> $1 LIMIT 5');
  const qslResults = await sql.query(
    'SELECT * FROM embeddings ORDER BY embedding <=> $1 LIMIT 5',
    [pgvector.toSql(embedding)],
  );
  console.timeEnd('postgres embedding <=> $1 LIMIT 5');
  // where bggId = bggId
  return qslResults.rows;
}