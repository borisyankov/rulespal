import { Button } from "@/app/ui/catalyst/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/catalyst/table";
import Title from "@/app/ui/title";
import Link from "next/link";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI();

export default async function ListAssistants() {
  const assistants = await openai.beta.assistants.list();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Title>Assistants</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Id</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>File Ids</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {assistants.data.map((assistant) => (
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
      {/* <Button href="/admin/create">Create Assistant</Button> */}
    </main>
  );
}
