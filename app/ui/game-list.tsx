import { Game } from '../lib/definitions';
import GameItem from './game-item';

export default function GameList({ games }: { games: Game[]}) {
  return (
    <div className="overflow-auto flex flex-1 flex-wrap content-start gap-3">
      {games.map((game, _) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
