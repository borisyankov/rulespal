import { fetchEmbeddingsById } from "@/app/lib/old-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import Link from "next/link";

export default async function EmbeddingsList({ bggid }: { bggid: string }) {
  const embeddings = await fetchEmbeddingsById(bggid);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>BGG Id</TableHead>
          <TableHead>Source</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {embeddings.map((embedding) => (
          <TableRow key={embedding.bggid}>
            <TableCell>{embedding.gamename}</TableCell>
            <TableCell className="text-zinc-500">{embedding.bggid}</TableCell>
            <TableCell className="text-zinc-500">{embedding.source}</TableCell>
            <TableCell>
              <Link
                href={`/admin/embeddings/${embedding.bggid}`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Details<span className="sr-only">, {embedding.bggid}</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
