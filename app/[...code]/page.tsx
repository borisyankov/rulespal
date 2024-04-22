import games from '@/data/games';
import Chat from './chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

type Props = {
  params: { code: string };
};

export default function Home({ params: { code } }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  return code[1] === 'chat' ? (
    <Chat game={game} />
  ) : (
      // <ExtraSources game={game} />
    <Rulebook code={game.code} resource={code[1] || 'rulebook'} />
  );
}
