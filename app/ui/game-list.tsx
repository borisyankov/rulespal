'use server'

import { fetchGames } from "@/app/lib/actions";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/ui/command";

export default async function GameBar() {
  const games = await fetchGames();
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
            <CommandItem key={game.name}>{game.name}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
