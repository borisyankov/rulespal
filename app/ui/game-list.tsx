import type { Game } from '../lib/definitions';
import GameItem from './game-item';

type Props = {
  games: Game[];
};

export default function GameList({ games }: Props) {
  return (
    <div className="flex flex-1 flex-wrap content-start gap-4 overflow-auto">
      {games.map((game) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
