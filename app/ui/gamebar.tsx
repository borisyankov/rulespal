import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import GameList from "./game-list";
import { Button } from "./button";

export default function GameBar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Search games...</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <GameList />
      </DialogContent>
    </Dialog>
  );
}
