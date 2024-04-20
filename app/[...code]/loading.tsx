import { BookOpenTextIcon } from 'lucide-react';
import HeaderGame from './header-game';
import games from '@/data/games';

export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      <HeaderGame game={games[0]} />
      <div className="screen flex items-center justify-center">
        <BookOpenTextIcon />
      </div>
    </div>
  );
}
