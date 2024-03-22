import games from '@/data/games';
import Chat from '../chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

import Header from './header';
import { Suspense } from 'react';

type Props = {
  params: { code: string };
};

export default function Home({ params: { code } }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  const tab = code[1] === 'chat' ? 'chat' : 'rulebook';
  return (
    <>
      <Header game={game} />
      {tab === 'chat' ? (
        <Chat game={game} />
      ) : (
        <Suspense>
          <Rulebook code={game.code} resource={code[1] || 'rulebook'} />
        </Suspense>
      )}
    </>
  );
}
