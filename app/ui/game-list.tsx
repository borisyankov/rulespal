import type { Game } from '../lib/definitions';
import GameItem from './game-item';

type Props = {
  games: Game[];
  selected?: Game;
};

export default function GameList({ games, selected }: Props) {
  return (
    <div className="flex flex-1 flex-wrap content-start gap-5 overflow-auto">
      {games.map((game) => (
        <GameItem
          key={game.code}
          game={game}
          selected={game.code === selected?.code}
        />
      ))}
    </div>
  );
}
