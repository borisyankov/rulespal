import { Game } from "@/app/lib/definitions";
// import { Button } from "@/catalyst/button";
import { Field, Label } from "@/app/ui/catalyst/fieldset";
import { Input } from "@/app/ui/catalyst/input";
import Title from "@/app/ui/title";
import { sql } from "@vercel/postgres";

export default async function CreateGame() {
  return (
    <main className="flex min-h-screen max-w-2xl flex-col p-24">
      <Title>Create Game</Title>

      <form>
        <Field>
          <Label>Name</Label>
          <Input name="game_name" />
        </Field>
        <Field>
          <Label>BGG Id</Label>
          <Input name="bgg_id" type="number" />
        </Field>
        {/* <Button>Create</Button> */}
        {/* <Button href="/admin/create">Create Assistant</Button> */}
      </form>
    </main>
  );
}
