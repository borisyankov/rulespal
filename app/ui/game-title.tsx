import type { Game } from '../lib/definitions';
import Thumbnail from './thumbnail';

type Props = {
  game: Game;
};

export default function GameTitle({ game }: Props) {
  return (
    <div className="inline-flex items-center gap-4">
      <Thumbnail game={game} className="size-12" />
      <h1 className="text-3xl font-semibold">{game.name}</h1>
    </div>
  );
}
