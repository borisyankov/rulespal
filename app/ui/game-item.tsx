import Thumbnail from './thumbnail';
import Link from 'next/link';
import { Game } from '../lib/definitions';

export default function GameItem({ game } : { game: Game }) {
  return (
    <Link
      className="cursor-pointer p-8
      size-52
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
      <Thumbnail game={game} />
      <span className="mt-2 text-xs opacity-75">{game.name}</span>
    </Link>
  );
}