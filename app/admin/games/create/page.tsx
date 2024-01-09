import { createGame } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { Field } from "@/app/ui/catalyst/fieldset";
import Title from "@/app/ui/title";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";

export default async function CreateGame() {
  return (
    <>
      <Title>Create Game</Title>
      <form action={createGame}>
        <Field className="mb-4">
          <Label>Name</Label>
          <Input name="game_name" />
        </Field>
        <Field className="mb-8">
          <Label>BGG Id</Label>
          <Input name="bgg_id" type="number" />
        </Field>
        <Button type="submit" asChild>
          <Link href="/admin/games/create"><PlusCircleIcon className="mr-2 h-4 w-4" /> Create</Link>
        </Button>
      </form>
    </>
  );
}
