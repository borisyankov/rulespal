import games from "@/data/games";
import Chat from "../chat";
import GameBar from "@/app/ui/gamebar";
import { redirect } from "next/navigation";

type Props = {
   params: { id: string };
}

export default function Home({ params: { id } }: Props) {
  const game = games.find((game) => game.bggid === +id);

  if (!game) {
    return redirect('/');
  }
  return (
    <div className="min-h-screen flex flex-col">
      <GameBar game={game} />
      <main className="flex flex-1 flex-col p-4">
        <Chat game={game} />
      </main>
    </div>
  );
}
