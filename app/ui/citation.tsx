import { BookOpenTextIcon, ArrowRightIcon } from 'lucide-react';
import type { Game } from '../lib/definitions';

type Props = {
  game: Game;
  text: string;
};

export default function Citation({ game, text }: Props) {
  if (!text || text.length === 0) {
    return null;
  }
  const regex = /^#{1,6}\s*(.*)$/m;
  const match = text.match(regex);
  const matched = match && match.length === 2;
  const href = matched
    ? match[1].toLowerCase().replaceAll(/[^a-zA-Z0-9]+/g, '-')
    : '';
  return (
    <a href={`/${game.code}/rulebook#${href}`} title={text}>
      <span className="flex w-16 rounded-full bg-primary p-1 align-middle hover:animate-pulse">
        <ArrowRightIcon size={24} className="p-1 text-gray-50" />
        <BookOpenTextIcon size={24} className="p-1	text-gray-50" />
      </span>
    </a>
  );
}
