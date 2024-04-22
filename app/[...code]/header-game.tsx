import Link from 'next/link';
import type { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import Header from '../ui/header';

type Props = {
  game: Game;
};

export default function HeaderGame({ game }: Props) {
  return (
    <Header>
      <Link href="/"><img className="h-6" src="/rulespal.svg" alt="RulesPal" /></Link>
      <Link href={`/${game.code}/chat`} className="flex flex-row gap-2 p-2 rounded-full hover:bg-primary/25">
        <MessageCircleQuestion className="text-primary" />
        <span className="hidden md:block text-primary font-semibold">Chat</span>
      </Link>
      <Link href={`/${game.code}/rulebook`} className="flex flex-row gap-2 p-2 rounded-full hover:bg-primary/25">
        <BookOpenTextIcon className="text-primary" />
        <span className="hidden md:block text-primary font-semibold">Rulebook</span>
      </Link>
      <ThemeSwitcher />
      <GameDialog game={game} />
    </Header>
  );
}
