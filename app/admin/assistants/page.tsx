import Title from "@/app/ui/title";
import OpenAI from "openai";
import AssistantsList from "./assistants-list";

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
