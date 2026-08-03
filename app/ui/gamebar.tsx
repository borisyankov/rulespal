'use client';

import GameList from './game-list';
import SearchInput from './search-input';
import { useState } from 'react';
import type { Game } from '../lib/definitions';
import NoResults from './no-results';
import { searchGames } from '../lib/search';

type Props = {
  game?: Game;
};

export default function GameBar({ game }: Props) {
  const [search, setSearch] = useState('');
  const shownGames = searchGames(search);
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="p-1">
        <SearchInput search={search} onSearchChange={setSearch} />
      </div>
      {shownGames.length > 0 ? (
        <GameList games={shownGames} selected={game} />
      ) : (
        <NoResults search={search} />
      )}
    </div>
  );
}
