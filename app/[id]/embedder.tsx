import { docToEmbeddings } from '../lib/old-actions';
import games from '@/data/games';

export default async function Embedder() {
  const gameRulebook = (await import(`../../data/rulebooks/${games[4].code}_rulebook.md`)).default;
  const embeddings = await docToEmbeddings(gameRulebook);
  console.log(embeddings);
  return <div className="flex min-h-screen flex-col">DONE</div>;
}
