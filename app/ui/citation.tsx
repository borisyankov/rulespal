import Link from "next/link";
import { Quote } from "lucide-react"
import type { Game } from "../lib/definitions";

type Props = {
  game: Game;
  text: string;
};

export default function Citation({ game, text }: Props) {
  if (!text || text.length === 0) {
    return null;
  }
  return (
    <Link href={`/${game.code}/rules`} title={text}>
      <span className="inline-block bg-primary rounded-full align-middle hover:animate-pulse">
        <Quote size={24} className="p-1.5	text-gray-50" />
      </span>
    </Link>
  );
}
