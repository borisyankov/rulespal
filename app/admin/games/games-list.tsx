import { Game } from "@/app/lib/definitions";
import { Link } from "@/app/ui/catalyst/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/catalyst/table";

export default async function ListGames({ games }: {games: Game[] })  {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>BGG Id</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>{game.name}</TableCell>
            <TableCell className="text-zinc-500">{game.bggid}</TableCell>
            <TableCell>
              <Link
                href={`/admin/games/${game.id}/edit`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Edit<span className="sr-only">, {game.id}</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
