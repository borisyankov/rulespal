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
      <Link href="/">
        <img className="h-6" src="/rulespal.svg" alt="RulesPal" />
      </Link>
      <Link
        href={`/${game.code}/`}
        className="flex flex-row gap-2 rounded-full p-2 hover:bg-primary/25"
      >
        <MessageCircleQuestion className="text-primary" />
        <span className="hidden font-semibold text-primary md:block">Chat</span>
      </Link>
      <Link
        href="rulebook"
        prefetch={false}
        className="flex flex-row gap-2 rounded-full p-2 hover:bg-primary/25"
      >
        <BookOpenTextIcon className="text-primary" />
        <span className="hidden font-semibold text-primary md:block">
          Rulebook
        </span>
      </Link>
      <ThemeSwitcher />
      <GameDialog game={game} />
    </Header>
  );
}
