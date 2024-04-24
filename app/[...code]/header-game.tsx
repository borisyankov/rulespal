'use client';

import Link from 'next/link';
import type { Game } from '../lib/definitions';
import GameDialog from '../ui/game-dialog';
import ThemeSwitcher from '../ui/theme-switcher';
import { MessageCircleQuestion, BookOpenTextIcon } from 'lucide-react';
import Header from '../ui/header';
import { usePathname } from 'next/navigation';
import TabButton from '../ui/tab-button';
import Logo from '../ui/logo';

type Props = {
  game: Game;
};

export default function HeaderGame({ game }: Props) {
  const pathname = usePathname();
  const isChatActive = (pathname.match(/\//g) || []).length === 1;
  return (
    <Header>
      <Link href="/">
        <Logo className="w-24" />
      </Link>
      <TabButton
        text="Chat"
        Icon={MessageCircleQuestion}
        href={`/${game.code}/`}
        isActive={isChatActive}
      />
      <TabButton
        text="Rulebook"
        Icon={BookOpenTextIcon}
        href={`/${game.code}/rulebook`}
        isActive={!isChatActive}
      />
      <ThemeSwitcher />
      <GameDialog game={game} />
    </Header>
  );
}
