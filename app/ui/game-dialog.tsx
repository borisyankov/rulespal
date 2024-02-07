'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import { Button } from "./button";
import { Game } from "../lib/definitions";
import Thumbnail from "./thumbnail";
import GameBar from "./gamebar";

type Props = {
  game: Game;
};

export default function GameDialog({ game }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Thumbnail className="size-8 mr-4" game={game} />
          {game.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="size-full">
        <GameBar />
      </DialogContent>
    </Dialog>
  );
}
