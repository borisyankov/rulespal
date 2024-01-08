import { createGame } from "@/app/lib/actions";
import { Button } from "@/app/ui/catalyst/button";
import { Field, Label } from "@/app/ui/catalyst/fieldset";
import { Input } from "@/app/ui/catalyst/input";
import Title from "@/app/ui/title";

export default async function CreateGame() {
  return (
    <>
      <Title>Create Game</Title>
      <form action={createGame}>
        <Field>
          <Label>Name</Label>
          <Input name="game_name" value="Wingspan" />
        </Field>
        <Field>
          <Label>BGG Id</Label>
          <Input name="bgg_id" type="number" value="266192" />
        </Field>
        <Button type="submit" href="/admin/games/create">Create</Button> 
      </form>
    </>
  );
}
