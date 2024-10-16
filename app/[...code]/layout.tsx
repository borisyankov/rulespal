import games from '@/data/games';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import Header from '../ui/header';

type Props = {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
};

export default async function Layout(props: Props) {
  const params = await props.params;

  const {
    code
  } = params;

  const {
    children
  } = props;

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
