import Title from "@/app/ui/title";
import EmbeddingsDetailsGroups from "./embeddings-details-groups";
import { Suspense } from "react";
import { Skeleton } from "@/app/ui/skeleton";

function renderSkeletons(num: number) {
  const components = [];
  for (let i = 0; i < num; i++) {
    components.push(<Skeleton key={i} className="h-4 w-full mb-4" />);
  }
  return components;
}

export default async function ViewEmbeddings({ params }: { params: { id: string } }) {
  const id = params.id;
  // const [showEmbeddings, setShowEmbeddings] = useState(false);
  return (
    <>
      <Title text="Embeddings" />
      <Suspense fallback={renderSkeletons(20)}>
        <EmbeddingsDetailsGroups id={id} />
      </Suspense>
    </>
  );
}
