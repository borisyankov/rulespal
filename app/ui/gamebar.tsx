import { Suspense } from "react";
import GameList from "./game-list";

export default function GameBar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameList />
    </Suspense>
  );
}
