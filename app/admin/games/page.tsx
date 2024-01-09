import { Game } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import Title from "@/app/ui/title";
import { sql } from "@vercel/postgres";
import GamesList from "./games-list";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default async function ListGames() {
  const games = await sql<Game>`SELECT * from games`;
  return (
    <>
      <Title>Games</Title>
      <GamesList games={games.rows} />
      <Button className="mt-8" asChild>
          <Link href="/admin/games/create"><PlusCircleIcon className="mr-2 h-4 w-4" />Create game</Link>
        </Button>
    </>
  );
}
