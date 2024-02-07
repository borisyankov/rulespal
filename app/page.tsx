import GameList from "./ui/game-list";
import games from '@/data/games';

export default function Home() {
  return (
    <div className="min-h-screen">
      <GameList games={games} />
    </div>
  );
}