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
import AssistantsList from "./assistants-list";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI();

export default async function ListAssistants() {
  const assistantsResponse = await openai.beta.assistants.list();

  return (
    <>
      <Title>Assistants</Title>
      <AssistantsList assistants={assistantsResponse.data} />
      {/* <Button href="/admin/create">Create Assistant</Button> */}
    </>
  );
}
