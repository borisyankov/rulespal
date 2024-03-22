'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import { Game } from "../lib/definitions";
import GameBar from "./gamebar";
import { SearchIcon } from "lucide-react";

type Props = {
  game: Game;
};

export default function GameDialog({ game }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="size-full">
        <GameBar />
      </DialogContent>
  </Dialog>
  );
}
