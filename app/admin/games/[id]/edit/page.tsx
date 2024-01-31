import { fetchGameById } from "@/app/lib/old-actions";
import Title from "@/app/ui/title";
import { notFound } from 'next/navigation';
import EmbeddingsList from "./embeddings-list";
import FileUpload from "./file-upload";
import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";
import { Suspense } from "react";

export default async function EditGame({ params }: { params: { id: string } }) {
  const id = params.id;
  const game = await fetchGameById(id);
  if (!game) {
    notFound();
  }
  return (
    <>
      <Title text="Edit Game" />
      <form>
        <div>
          <Label>Name</Label>
          <Input name="game_name" value={game.name} />
        </div>
        <div>
          <Label>BGG Id</Label>
          <Input name="bgg_id" type="number" value={game.bggid}  />
        </div>
      </form>
      <h2 className="mt-8">Embeddings</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <EmbeddingsList bggid={game.bggid} /> */}
      </Suspense>
      <FileUpload />
    </>
  );
}
