import Thumbnail from './thumbnail';
import Link from 'next/link';
import type { Game } from '../lib/definitions';

export default function GameItem({ game } : { game: Game }) {
  return (
    <Link
      className="cursor-pointer
      w-28
      flex flex-col items-center justify-center overflow-hidden text-balance rounded-xl
      bg-zinc-100
      dark:bg-zinc-900
      text-center 
      border-4
      border-transparent
      hover:border-primary
      transition-colors
      hover:dark:bg-primary
      "
      key={game.name}
      href={`/${game.code}`}
    >
      <div className="size-28">
        <Thumbnail game={game} className="size-full" />
      </div>
      <div className="h-10 flex items-center text-xs opacity-75 text-ellipsis">{game.shortName || game.name}</div>
    </Link>
  );
}