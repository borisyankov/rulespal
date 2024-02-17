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
        <Button variant="ghost">
          <Thumbnail className="size-10" game={game} />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-full">
        <GameBar />
      </DialogContent>
    </Dialog>
  );
}
