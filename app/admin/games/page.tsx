import { Game } from "@/app/lib/definitions";
import { Link } from "@/app/ui/catalyst/link";
// import { Button } from "@/catalyst/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/catalyst/table";
import Title from "@/app/ui/title";
import { sql } from "@vercel/postgres";

export default async function ListGames() {
  const games = await sql<Game>`SELECT * from games`;
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Title>Games</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>BGG Id</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.rows.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.name}</TableCell>
              <TableCell className="text-zinc-500">{game.bggId}</TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Edit<span className="sr-only">, {game.id}</span>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="games/create">Create</Link>
    </main>
  );
}
