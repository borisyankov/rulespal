import Title from "@/app/ui/title";
import AssistantsList from "./assistants-list";
import { Suspense } from "react";

export default async function ListAssistants() {

  return (
    <>
      <Title>Assistants</Title>
      <Suspense fallback={<div>Loading...</div>}>
        <AssistantsList />
      </Suspense>
      {/* <Button href="/admin/create">Create Assistant</Button> */}
    </>
  );
}
