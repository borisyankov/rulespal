import games from '@/data/games';
import Chat from './chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

import { Suspense } from 'react';
import HeaderGame from './header-game';

type Props = {
  params: { code: string };
};

export default function Home({ params: { code } }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  return (
    <div className="h-screen flex flex-col">
      <HeaderGame game={game} />
      <main className="flex flex-1 flex-row gap-4 justify-center overflow-auto scroll-smooth px-4">
        {code[1] !== 'rulebook' ? <Chat game={game} /> : null}
        {code[1] !== 'chat' ? (
          <Suspense fallback={<p>Loading...</p>}>
            <Rulebook code={game.code} resource={code[1] || 'rulebook'} />
          </Suspense>
        ) : null}
      </main>
    </div>
  );
}
