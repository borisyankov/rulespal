'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import GameList from "./game-list";
import { Button } from "./button";
import { Game } from "../lib/definitions";
import Thumbnail from "./thumbnail";
import { Input } from "./input";
import { Search } from "lucide-react";
import { useState } from "react";
import games from '@/data/games';

type Props = {
  game: Game;
};

function matchesSearchInput(target: string, searchInput: string): boolean {
  let searchIndex = 0;
  const lowerCaseTarget = target.toLowerCase();
  const lowerCaseSearchInput = searchInput.toLowerCase();
  for (let i = 0; i < lowerCaseTarget.length; i++) {
    if (lowerCaseTarget[i] === lowerCaseSearchInput[searchIndex]) {
      searchIndex++;
    }
    if (searchIndex === lowerCaseSearchInput.length) {
      return true;
    }
  }
  return false;
}

export default function GameBar({ game }: Props) {
  const [search, setSearch] = useState("");
  const shownGames = games.filter((game) => matchesSearchInput(game.name, search));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Thumbnail className="size-8 mr-4" game={game} />
          {game.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="size-full">
        <div className="relative flex items-center max-w-2xl ">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Your search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
        </div>
        <GameList games={shownGames} />
      </DialogContent>
    </Dialog>
  );
}
