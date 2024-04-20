import type { Game } from '../lib/definitions';
import GameItem from './game-item';

type Props = {
  games: Game[];
}

export default function GameList({ games }: Props) {
  return (
    <div className="overflow-auto flex flex-1 flex-wrap content-start gap-3">
      {games.map((game) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
