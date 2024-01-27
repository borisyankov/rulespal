import games from "@/data/games";
import Chat from "./chat";
import GameBar from "@/app/ui/gamebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameBar game={games[0]} />
      <main className="flex flex-1 flex-col p-4">
        <Chat />
      </main>
    </div>
  );
}
