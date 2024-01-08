import { EmbeddingDetails } from "@/app/lib/definitions";

export default async function EmbeddingsDetailsList({ embeddingsDetails, showEmbeddings }: { embeddingsDetails: EmbeddingDetails[], showEmbeddings: boolean }) {
  return (
    <>
      {embeddingsDetails.map((embedding, idx) => (
        <div key={idx.toString()} className="py-4">
          <p>{embedding.content}</p>
          {showEmbeddings && <p className="text-zinc-500 break-words">{embedding.embedding}</p>}
        </div>
      ))}
    </>
  );
}
