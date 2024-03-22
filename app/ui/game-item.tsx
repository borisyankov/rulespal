import Thumbnail from './thumbnail';
import Link from 'next/link';
import { Game } from '../lib/definitions';

export default function GameItem({ game } : { game: Game }) {
  return (
    <Link
      className="cursor-pointer
      h-42 w-32
      flex flex-col items-center justify-center overflow-hidden text-balance rounded-xl
      bg-white
      dark:bg-zinc-800
      text-center 
      border-2
      border-transparent
      shadow-sm
      hover:border-primary
      "
      key={game.name}
      href={`/${game.code}`}
    >
      <div className="size-32">
        <Thumbnail game={game} className="size-full" />
      </div>
      <div className="h-10 flex items-center text-xs opacity-75">{game.shortName || game.name}</div>
    </Link>
  );
}