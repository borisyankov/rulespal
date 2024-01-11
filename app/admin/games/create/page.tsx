import Title from "@/app/ui/title";
import CreateGameForm from "./create-game-form";

export default function CreateGame() { // async
  return (
    <>
      <Title text="Create Game" />
      <CreateGameForm />
    </>
  );
}
