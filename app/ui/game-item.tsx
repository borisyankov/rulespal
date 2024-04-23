import Thumbnail from './thumbnail';
import Link from 'next/link';
import type { Game } from '../lib/definitions';
import { cn } from '../lib/utils';

type Props = {
  game: Game;
  selected: boolean;
};

export default function GameItem({ game, selected }: Props) {
  return (
    <Link
      className={cn(
        `flex
          w-28
          cursor-pointer flex-col items-center justify-center overflow-hidden text-balance rounded-xl
          border-4
          border-transparent
          text-center
          transition-colors
          hover:border-primary
          dark:bg-zinc-900
          hover:dark:bg-primary
      `,
        selected
          ? 'pointer-events-none bg-primary dark:bg-primary'
          : 'bg-zinc-100 dark:bg-zinc-900',
      )}
      key={game.name}
      href={`/${game.code}`}
    >
      <div className="size-28">
        <Thumbnail game={game} className="size-full" />
      </div>
      <div className="flex h-10 items-center text-ellipsis text-xs opacity-75">
        {game.shortName || game.name}
        {selected}
      </div>
    </Link>
  );
}
