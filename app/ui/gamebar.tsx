import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import GameList from "./game-list";
import { Button } from "./button";
import { Game } from "../lib/definitions";
import Thumbnail from "./thumbnail";

type Props = {
  game: Game;
};

export default function GameBar({ game }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Thumbnail className="size-8 mr-4" game={game} />
          {game.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px] max-h-[600px]">
        <GameList />
      </DialogContent>
    </Dialog>
  );
}
