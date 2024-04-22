import Link from "next/link";
import { BookOpenTextIcon, ArrowRightIcon } from "lucide-react";
import type { Game } from "../lib/definitions";

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
  const href = matched ? match[1].toLowerCase().replaceAll(' ', '-') : '';
  return (
    <Link href={`/${game.code}/rulebook#${href}`} title={text} scroll>
      <span className="flex p-1 w-16 bg-primary rounded-full align-middle hover:animate-pulse">
        <ArrowRightIcon size={24} className="p-1 text-gray-50" />
        <BookOpenTextIcon size={24} className="p-1	text-gray-50" /> 
      </span>
    </Link>
  );
}
