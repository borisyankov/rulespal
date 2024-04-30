import games from '@/data/games';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import Header from '../ui/header';

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
    <>
      <Header game={game} />
      {children}
      <Script src="/scroll.js" />
    </>
  );
}
