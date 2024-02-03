'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/ui/command';
import games from '@/data/games';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import Thumbnail from './thumbnail';
import Link from 'next/link';
import { Game } from '../lib/definitions';

function GameList2() {
  const router = useRouter();
  return (
    <Command className="w-lg">
      <CommandInput placeholder="Search for a game..." />
      <CommandList>
        <CommandEmpty className="flex flex-col items-center p-4">
          <BookOpen className="opacity-50" /> No games found.
        </CommandEmpty>
        <CommandGroup className="max-h-50 flex flex-wrap">
          {games.map((game, _) => (
            <CommandItem
              className="w-40 cursor-pointer p-4"
              key={game.name}
              onSelect={() => {
                router.push(`/${game.bggid}`);
              }}
            >
              <Thumbnail game={game} />
              <span className="mt-2">{game.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function GameItem({ game } : { game: Game }) {
  return (
    <Link
      className="cursor-pointer p-8
      size-40
      flex flex-col items-center justify-center overflow-hidden text-balance rounded-xl bg-gray-50/50
      text-center 
      shadow
      hover:bg-gray-300 hover:shadow-inner
       dark:border-gray-800/70
        dark:bg-gray-950/20 dark:hover:bg-gray-950/40
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
  const router = useRouter();
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {/* <input type='text' /> */}
      {games.map((game, _) => (
        <GameItem key={game.code} game={game} />
      ))}
    </div>
  );
}
