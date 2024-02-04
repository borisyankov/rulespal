'use client';

import games from '@/data/games';
import Thumbnail from './thumbnail';
import Link from 'next/link';
import { Game } from '../lib/definitions';

function GameItem({ game } : { game: Game }) {
  return (
    <Link
      className="cursor-pointer p-8
      size-40
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
      href={`/${game.bggid}`}
    >
      <Thumbnail game={game} />
      <span className="mt-2 text-sm opacity-75">{game.name}</span>
    </Link>
  );
}

export default function GameList() {
  return (
    <div className="flex flex-wrap gap-3 bg-slate-100 dark:bg-zinc-900">
      {games.map((game, _) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
