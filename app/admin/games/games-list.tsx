import { fetchGames } from "@/app/lib/old-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";

export default async function ListGames() {
  const games = await fetchGames();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>BGG Id</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.bggid}>
            <TableCell>
              <a
                href={`/admin/games/${game.bggid}/edit`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                {game.name}
              </a>
            </TableCell>
            <TableCell className="text-zinc-500">
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                href={`https://boardgamegeek.com/boardgame/${game.bggid}`}
              >
                {game.bggid}
              </a>
            </TableCell>
            <TableCell>
              <a
                href={`/admin/games/${game.bggid}/edit`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Edit<span className="sr-only">, {game.bggid}</span>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
