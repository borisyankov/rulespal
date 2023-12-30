const { sql } = require('@vercel/postgres');

async function seedLogs() {
  console.log('creating extension');
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  console.log('creating logs table');
  const createTable = await sql`
  CREATE TABLE IF NOT EXISTS logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    time TIMESTAMP NOT NULL,
    message TEXT NOT NULL 
  );
`;
  console.log('done');
  console.log(createTable);
}

async function seedGames() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  const createTable = await sql`
  CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bggId NUMERIC NOT NULL UNIQUE
  );
`;
}

(async () => {
  await seedLogs();
  await seedGames();
})();