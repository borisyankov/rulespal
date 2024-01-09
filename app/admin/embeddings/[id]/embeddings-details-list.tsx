import { EmbeddingDetails } from "@/app/lib/definitions";

export default async function EmbeddingsDetailsList({ embeddingsDetails, showEmbeddings }: { embeddingsDetails: EmbeddingDetails[], showEmbeddings: boolean }) {
  return (
    <>
      {embeddingsDetails.map((embedding, idx) => (
        <li key={idx.toString()} className="py-4">
          <div>{embedding.content}</div>
          {showEmbeddings && <div className="text-zinc-500 break-words">{embedding.embedding}</div>}
        </li>
      ))}
    </>
  );
}
