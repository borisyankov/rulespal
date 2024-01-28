"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/ui/command";
import assets from "@/data/games";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import Thumbnail from "./thumbnail";

export default function GameList() {
  const router = useRouter();
  const games = assets;
  return (
    <Command>
      <CommandInput placeholder="Search for a game..." />
      <CommandList>
        <CommandEmpty className="flex flex-col items-center p-4">
          <BookOpen className="opacity-50" /> No games found.
        </CommandEmpty>
        <CommandGroup className="max-h-50">
          {games.map((game, _) => (
            <CommandItem
              className="cursor-pointer"
              key={game.name}
              onSelect={() => {
                router.push(`/${game.bggid}`);
              }}
            >
              <Thumbnail className="mr-4" game={game} />
              {game.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
