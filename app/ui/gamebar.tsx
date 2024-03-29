'use client';

import GameList from './game-list';
import { Input } from './input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import games from '@/data/games';

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

export default function GameBar() {
  const [search, setSearch] = useState('');
  const shownGames = games.filter((game) =>
    ([game.name, game.code, ...(game.alternativeNames || [])].some((name) =>
      matchesSearchInput(name, search)))
  );
  return (
    <div className="flex flex-col gap-5 overflow-auto">
      <div className="relative w-full flex items-center p-1">
        <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="Your search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-8"
        />
      </div>
      <GameList games={shownGames} />
    </div>
  );
}
