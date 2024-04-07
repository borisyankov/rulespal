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
    <>
      <HeaderGame game={game} />
      <div className="flex flex-row items-center justify-center">
        {code[1] !== 'rulebook' ? <Chat game={game} /> : null}
        {code[1] !== 'chat' ? (
          <div className="h-screen overflow-auto">
            <Suspense fallback={<p>Loading feed...</p>}>
              <Rulebook code={game.code} resource={code[1] || 'rulebook'} />
            </Suspense>
          </div>
        ) : null}
      </div>
    </>
  );
}
