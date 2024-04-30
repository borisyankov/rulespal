'use client';

import GameList from './game-list';
import { Input } from './input';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import games from '@/data/games';
import type { Game } from '../lib/definitions';
import NoResults from './no-results';

function matchesSearchInput(target: string, searchInput: string): boolean {
  let searchIndex = 0;
  const lowerCaseTarget = target.toLowerCase();
  const lowerCaseSearchInput = searchInput.toLowerCase();
  for (let i = 0; i < lowerCaseTarget.length; i++) {
    if (lowerCaseTarget[i] === lowerCaseSearchInput[searchIndex]) {
      searchIndex++;
    }
    if (searchIndex === lowerCaseSearchInput.length) {
      return true;
    }
  }
  return false;
}

type Props = {
  game?: Game;
};

export default function GameBar({ game }: Props) {
  const [search, setSearch] = useState('');
  const shownGames = games.filter((game) =>
    [game.name, game.code, ...(game.alternativeNames || [])].some((name) =>
      matchesSearchInput(name, search),
    ),
  );
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="relative flex w-full items-center p-1">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
        <Input
          autoFocus
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-8"
        />
      </div>
      {shownGames.length > 0 ? (
        <GameList games={shownGames} selected={game} />
      ) : (
        <NoResults search={search} />
      )}
    </div>
  );
}
