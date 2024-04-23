'use client';

import Link from 'next/link';
import type { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import Header from '../ui/header';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

type Props = {
  game: Game;
};

export default function HeaderGame({ game }: Props) {
  const pathname = usePathname();
  const isChatActive = (pathname.match(/\//g) || []).length === 1;
  return (
    <Header>
      <Link href="/">
        <img className="h-6" src="/rulespal.svg" alt="RulesPal" />
      </Link>
      <div
        className={cn(isChatActive && 'shadow-[0_5px_0_0_hsl(var(--primary))]')}
      >
        <Link
          href={`/${game.code}/`}
          className="flex flex-row gap-2 rounded-md p-2 hover:bg-primary/25"
        >
          <MessageCircleQuestion className="text-primary" />
          <span className="hidden font-semibold text-primary md:block">
            Chat
          </span>
        </Link>
      </div>
      <div
        className={cn(
          !isChatActive && 'shadow-[0_5px_0_0_hsl(var(--primary))]',
        )}
      >
        <Link
          href={`/${game.code}/rulebook`}
          prefetch={false}
          className="flex flex-row gap-2 rounded-md p-2 hover:bg-primary/25"
        >
          <BookOpenTextIcon className="text-primary" />
          <span className="hidden font-semibold text-primary md:block">
            Rulebook
          </span>
        </Link>
      </div>
      <ThemeSwitcher />
      <GameDialog game={game} />
    </Header>
  );
}
