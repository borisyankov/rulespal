import { fetchEmbeddingsDetailsById } from "@/app/lib/old-actions";
import EmbeddingsDetailsList from "./embeddings-details-list";

export default async function EmbeddingsDetailsGroups({ id }: { id: string }) {
  const embeddingsDetails = await fetchEmbeddingsDetailsById(id);
  return (
    <>
      {Object.keys(embeddingsDetails).map((key) => (
        <ul key={key}>
          <h2>{embeddingsDetails[key][0].source}</h2>
          <EmbeddingsDetailsList embeddingsDetails={embeddingsDetails[key]} showEmbeddings={false} />
        </ul>
      ))}
    </>
  );
}
