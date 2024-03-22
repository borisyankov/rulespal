import Link from 'next/link';
import { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import Thumbnail from '../ui/thumbnail';

type Props = {
  game: Game;
};

export default function Home({ game }: Props) {
  return (
    <header className="fixed top-0 inset-x-0 bg-primary">
      <div className="flex w-full m-auto px-2 max-w-screen-md flex-row items-center justify-between gap-8">
        <div className="flex flex-row items-center gap-2">
          <Thumbnail className="size-10" game={game} />
          {game.name}
        </div>
        <Link href={`/${game.code}/chat`} className="flex flex-row gap-2">
          <MessageCircleQuestion />
          <span className="hidden md:block">Chat</span>
        </Link>
        <Link href={`/${game.code}/rulebook`} className="flex flex-row gap-2">
          <BookOpenTextIcon />
          <span className="hidden md:block">Rulebook</span>
        </Link>
        <ThemeSwitcher />
        <GameDialog game={game} />
      </div>
    </header>
  );
}
