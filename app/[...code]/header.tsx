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
  // const tab = code[1] === 'chat' ? 'chat' : 'rulebook';
  return (
    <header className="fixed top-0 inset-x-0 gap-8 flex flex-row bg-primary items-center justify-center">
      <Thumbnail className="size-10" game={game} />
      <GameDialog game={game} />
      <Link href={`/${game.code}/chat`} className="flex flex-row gap-2">
        <MessageCircleQuestion /><span className="hidden md:block">Chat</span>
      </Link>
      <Link href={`/${game.code}/rulebook`} className="flex flex-row gap-2">
        <BookOpenTextIcon /><span className="hidden md:block">Rulebook</span>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
