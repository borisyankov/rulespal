import games from '@/data/games';
import Chat from './chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

type Props = {
  params: Promise<{ code: string }>;
};

export default async function GamePage(props: Props) {
  const params = await props.params;

  const {
    code
  } = params;

  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  return !code[1] || code[1] === 'chat' ? (
    <Chat game={game} />
  ) : (
    <Rulebook game={game} resource={code[1] || 'rulebook'} />
  );
}
