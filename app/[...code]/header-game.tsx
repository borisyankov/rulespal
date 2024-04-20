import Link from 'next/link';
import type { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import Thumbnail from '../ui/thumbnail';
import Header from '../ui/header';

type Props = {
  game: Game;
};

export default function HeaderGame({ game }: Props) {
  return (
    <Header>
      <div className="flex flex-row items-center gap-2">
        <Thumbnail className="size-10" game={game} />
        <span className="hidden md:block">{game.name}</span>
      </div>
      <Link href={`/${game.code}/chat`} className="flex flex-row gap-2 p-2 rounded-md hover:bg-white/20">
        <MessageCircleQuestion />
        <span className="hidden md:block">Chat</span>
      </Link>
      <Link href={`/${game.code}/rulebook`} className="flex flex-row gap-2 p-2 rounded-md hover:bg-white/20">
        <BookOpenTextIcon />
        <span className="hidden md:block">Rulebook</span>
      </Link>
      <ThemeSwitcher />
      <GameDialog game={game} />
    </Header>
  );
}
