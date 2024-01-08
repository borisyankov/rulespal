const { sql } = require('@vercel/postgres');

async function seedLogs() {
  const createTable = await sql`
  CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP NOT NULL,
    message TEXT NOT NULL 
  );
`;
}

async function seedGames() {
  const createTable = await sql`
  CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bggId NUMERIC NOT NULL UNIQUE
  );
`;
}

async function seedEmbeddings() {
  await sql`CREATE EXTENSION IF NOT EXISTS "vector"`;
  const createTable = await sql`
  CREATE TABLE IF NOT EXISTS embeddings (
    id SERIAL PRIMARY KEY,
    bggId NUMERIC NOT NULL,
    source VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536)
  );
`;
}

(async () => {
  await seedLogs();
  await seedGames();
  await seedEmbeddings();
})();