import games from '@/data/games';
import Chat from './chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

import { Suspense } from 'react';
import HeaderGame from './header-game';
import ExtraSources from '../ui/extra-sources';

type Props = {
  children: React.ReactNode;
  params: { code: string };
};

export default function Layout({ params: { code }, children }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  return (
    <div className="flex h-screen flex-col">
      <HeaderGame game={game} />
      <main className="flex flex-1 flex-row justify-center gap-4 overflow-auto scroll-smooth px-4">
        {children}
      </main>
    </div>
  );
}
