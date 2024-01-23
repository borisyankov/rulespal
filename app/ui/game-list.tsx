'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/app/ui/command";
import assets from "@/rulebooks/assets";
import { useRouter } from "next/navigation";

export default function GameBar() {
  const router = useRouter();
  const games = assets;
  return (
    <Command>
      <CommandInput placeholder="Search for a game..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Previously">
          <CommandItem>Anachrony</CommandItem>
          <CommandItem>Underwater Cities</CommandItem>
          <CommandItem>Dune Imperium</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="All">
          {games.map((game, index) => (
            <CommandItem
              className="cursor-pointer"
              key={game.name}
              onSelect={() => { router.push(`/${game.bggid}`); }}
            >
              {game.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
