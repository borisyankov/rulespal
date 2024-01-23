import assets from "@/rulebooks/assets";
import Chat from "../chat";
import GameBar from "@/app/ui/gamebar";
import { redirect } from "next/navigation";

type Props = {
   params: { id: string };
}

export default function Home({ params: { id } }: Props) {
  const game = assets.find((game) => game.bggid === +id);
  if (!game) {
    return redirect('/');
  }
  return (
    <div className="min-h-screen flex flex-col">
      {game.name}
      <GameBar />
      <main className="flex flex-1 flex-col p-4">
        <Chat />
      </main>
    </div>
  );
}
