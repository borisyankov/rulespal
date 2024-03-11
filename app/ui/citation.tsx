import Link from "next/link";
import { Quote } from "lucide-react"
import { Game } from "../lib/definitions";

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
      <span className="inline-block bg-primary rounded-full ml-1 align-middle">
        <Quote size={20} className="p-1	text-gray-50" />
      </span>
      {/* {text}
      <span className="inline-block bg-primary rounded-full ml-1 align-middle">
        <Quote size={20} className="p-1	text-gray-50" />
      </span> */}
    </Link>
  );
}
