import { Game } from "@/app/lib/definitions";
import { Link } from "@/app/ui/catalyst/link";
// import { Button } from "@/catalyst/button";
import Title from "@/app/ui/title";
import { sql } from "@vercel/postgres";
import GamesList from "./games-list";

export default async function ListGames() {
  const games = await sql<Game>`SELECT * from games`;
  return (
    <>
      <Title>Games</Title>
      <GamesList games={games.rows} />
      <Link href="/admin/games/create">Create</Link>
    </>
  );
}
