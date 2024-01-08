import { Game } from "@/app/lib/definitions";
import { Button } from "@/app/ui/catalyst/button";
import Title from "@/app/ui/title";
import { sql } from "@vercel/postgres";
import GamesList from "./games-list";

export default async function ListGames() {
  const games = await sql<Game>`SELECT * from games`;
  return (
    <>
      <Title>Games</Title>
      <GamesList games={games.rows} />
      <Button href="/admin/games/create">Create</Button> 
    </>
  );
}
