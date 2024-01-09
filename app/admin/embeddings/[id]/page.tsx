import { fetchEmbeddingsDetailsById } from "@/app/lib/actions";
import Title from "@/app/ui/title";
import EmbeddingsDetailsList from "./embeddings-details-list";

export default async function ViewEmbeddings({ params }: { params: { id: string } }) {
  const id = params.id;
  // const [showEmbeddings, setShowEmbeddings] = useState(false);
  const embeddingsDetails = await fetchEmbeddingsDetailsById(id);
  return (
    <>
      <Title>Embeddings</Title>
      {Object.keys(embeddingsDetails).map((key) => (
        <ul key={key}>
          <h2>{embeddingsDetails[key][0].source}</h2>
          <EmbeddingsDetailsList embeddingsDetails={embeddingsDetails[key]} showEmbeddings={false} />
        </ul>
      ))}
    </>
  );
}
