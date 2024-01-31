import { notFound } from 'next/navigation';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import games from "@/data/games";
import { Game } from '@/app/lib/definitions';

export default async function Rules({ params }: { params: { id: string } }) {
  const id = params.id;
  const game = games.find((asset: Game) => asset.bggid === +id);
  if (!game) {
    return notFound();
  }
  const gameRulebook = (await import(`../../../data/rulebooks/${games[4].code}_rulebook.md`)).default;
  return (
    <div className="flex min-h-screen flex-col max-w-lg mx-auto p-4">
      <Markdown className="prose prose-zinc dark:prose-invert mb-10"  remarkPlugins={[remarkGfm]}>
        {gameRulebook}
      </Markdown>
    </div>
  );
}
