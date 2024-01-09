import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import Link from "next/link";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";

export default async function ListAssistants({ assistants }: { assistants: Assistant[] }) {
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>File Ids</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assistants.map((assistant) => (
            <TableRow key={assistant.id}>
              <TableCell>{assistant.name}</TableCell>
              <TableCell className="text-zinc-500">{assistant.id}</TableCell>
              <TableCell className="text-zinc-500">
                {assistant.description}
              </TableCell>
              <TableCell className="text-zinc-500">
                {assistant.file_ids}
              </TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Edit<span className="sr-only">, {assistant.id}</span>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
