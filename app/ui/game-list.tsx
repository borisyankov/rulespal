import { Game } from '../lib/definitions';
import GameItem from './game-item';

export default function GameList({ games }: { games: Game[]}) {
  return (
    <div className="overflow-auto flex flex-wrap gap-3 bg-slate-100 dark:bg-zinc-900">
      {games.map((game, _) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
