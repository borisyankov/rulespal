import { Button } from "@/app/ui/button";
import Title from "@/app/ui/title";
import GamesList from "./games-list";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

export default async function ListGames() {
  return (
    <>
      <Title>Games</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <GamesList  />
      </Suspense>
      <Button className="mt-8" asChild>
        <Link href="/admin/games/create"><PlusCircleIcon className="mr-2 h-4 w-4" />Create game</Link>
      </Button>
    </>
  );
}
