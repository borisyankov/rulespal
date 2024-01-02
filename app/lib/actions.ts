"use server";

import { sql } from "@vercel/postgres";
import pgvector from "pgvector/pg";
import OpenAI from "openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

const openai = new OpenAI();

export async function pdfToEmbeddings(filename: string) {
  const loader = new PDFLoader(filename);
  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await textSplitter.splitDocuments(docs);
  console.log(JSON.stringify(chunks, null, 2));
  const embeddingResponse = await openai.embeddings.create({
    input: chunks.map((x) => x.pageContent),
    model: 'text-embedding-ada-002',
  })
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
        [bggId, source, chunks[i].pageContent, pgvector.toSql(embeddings[i])]
      );
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Embeddings.",
    };
  }
}

export async function dododo() {
  const { chunks, vectors } = await pdfToEmbeddings(
    "..\\..\\DUNE_IMPERIUM_UPRISING_RULEBOOK.pdf"
  );
  createEmbeddings(397598, "Rulebook", chunks, vectors);
}
