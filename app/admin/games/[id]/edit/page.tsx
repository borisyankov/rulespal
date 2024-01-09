import { fetchGameById } from "@/app/lib/actions";
import { Field } from "@/app/ui/catalyst/fieldset";
import Title from "@/app/ui/title";
import { notFound } from 'next/navigation';
import EmbeddingsList from "./embeddings-list";
import FileUpload from "./file-upload";
import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";

export default async function EditGame({ params }: { params: { id: string } }) {
  const id = params.id;
  const game = await fetchGameById(id);
  if (!game) {
    notFound();
  }
  return (
    <>
      <Title>Edit Game</Title>
      <form>
        <Field>
          <Label>Name</Label>
          <Input name="game_name" value={game.name} />
        </Field>
        <Field>
          <Label>BGG Id</Label>
          <Input name="bgg_id" type="number" value={game.bggid}  />
        </Field>
      </form>
      <h2 className="mt-8">Embeddings</h2>
      <EmbeddingsList bggid={game.bggid} />
      <FileUpload />
    </>
  );
}
