import { Game } from "../lib/definitions";
import Thumbnail from "./thumbnail";

type Props = {
  game: Game;
};

export default function EmptyState({ game }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="text-center">
        <Thumbnail game={game} className="mx-auto mb-4 size-48" />
        <h2>Ask any rules question about {game.name}<br/>Get answers directly from the rule book.</h2>
      </div>
    </div>
  );
}
