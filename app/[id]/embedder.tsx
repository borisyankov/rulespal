import { docToEmbeddings } from '../lib/actions';
import games from '@/data/games';

export default async function Embedder() {
  const embeddings = await docToEmbeddings(games[4].rulebook);
  console.log(embeddings);
  return <div className="flex min-h-screen flex-col">DONE</div>;
}
