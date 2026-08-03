'use client';

import { useState } from 'react';
import Header from './header';
import GameList from './game-list';
import NoResults from './no-results';
import { searchGames } from '../lib/search';

export default function GameBrowser() {
  const [search, setSearch] = useState('');
  const shownGames = searchGames(search);
  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <div className="mx-auto flex w-full max-w-screen-md flex-1 flex-col overflow-auto">
        {shownGames.length > 0 ? (
          <GameList games={shownGames} />
        ) : (
          <NoResults search={search} />
        )}
      </div>
    </>
  );
}
