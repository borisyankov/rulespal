'use server'

import { fetchGames } from "../lib/actions";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function GameList() {
  const games = await fetchGames();
  return (
    <ul className="-mx-2 space-y-1">
      {games.map((game, index) => (
        <li key={game.name}>
          <a
            href={`#${game.bggid}`}
            className={classNames(
              index === 0
                ? "bg-gray-50 text-indigo-600"
                : "text-gray-300 hover:text-indigo-600 hover:bg-gray-50",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            )}
          >
          {game.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
