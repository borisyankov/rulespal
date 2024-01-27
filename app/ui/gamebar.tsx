import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import GameList from "./game-list";
import { Button } from "./button";
import { Game } from "../lib/definitions";

type Props = {
  game: Game;
}

export default function GameBar({ game }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><img className="object-scale-down size-6 mr-4" src={game.thumbnail} alt={`${game.name} thumbnail`} />{game.name}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <GameList />
      </DialogContent>
    </Dialog>
  );
}
