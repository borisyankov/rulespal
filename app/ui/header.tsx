'use client';

import Link from 'next/link';
import type { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import TabButton from '../ui/tab-button';
import Logo from '../ui/logo';

type Props = {
  game?: Game;
};

export default function Header({ game }: Props) {
  const pathname = usePathname();
  const isChatActive = (pathname.match(/\//g) || []).length === 1;
  return (
    <header className="fixed z-50 left-0 top-0 w-full backdrop-blur-3xl p-2 bg-background/50">
      <div className="m-auto flex w-full max-w-screen-sm flex-row items-center justify-between gap-8 text-white/80">
        <Link href="/">
          <Logo className="w-24" />
        </Link>
        {game && (
          <TabButton
            text="Chat"
            Icon={MessageCircleQuestion}
            href={`/${game.code}/`}
            isActive={isChatActive}
          />
        )}
        {game && (
          <TabButton
            text="Rulebook"
            Icon={BookOpenTextIcon}
            href={`/${game.code}/rulebook`}
            isActive={!isChatActive}
          />
        )}
        <ThemeSwitcher />
        {game && <GameDialog game={game} />}
      </div>
    </header>
  );
}
