import type { Game } from '../lib/definitions';
import Thumbnail from './thumbnail';

type Props = {
  game: Game;
};

export default function EmptyState({ game }: Props) {
  return (
    <div className="flex size-full items-center justify-center text-center">
      <div className="">
        <Thumbnail game={game} className="mx-auto mb-4 size-48" />
        <h2>
          Ask any rules question about {game.name}.<br />
          Get answers directly from the rule book.
        </h2>
      </div>
    </div>
  );
}
