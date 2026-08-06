import Thumbnail from './thumbnail';
import Link from 'next/link';
import type { Game } from '../lib/definitions';

type Props = {
  game: Game;
};

export default function GameItem({ game }: Props) {
  return (
    <Link
      className="flex
        w-28
        cursor-pointer flex-col items-center justify-center overflow-hidden text-balance rounded-xl
        border-4
        border-transparent
        bg-zinc-100
        text-center
        transition-colors
        hover:border-primary
        dark:bg-zinc-900
        hover:dark:bg-primary"
      key={game.name}
      href={`/${game.code}`}
      title={game.name}
    >
      <div className="size-28">
        <Thumbnail game={game} className="size-full" />
      </div>
      <div className="flex h-10 items-center text-ellipsis text-xs opacity-75">
        {game.shortName || game.name}
      </div>
    </Link>
  );
}
