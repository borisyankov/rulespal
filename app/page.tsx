"use client";

import { experimental_useAssistant as useAssistant, useChat } from "ai/react";
import EmptySlate from "@/components/empty-slate";
import Chat from "../components/chat";
import Navbar from "../components/navbar";
import Inputer from "../components/inputer";

export default function Home() {
  // const { status, messages, input, handleSubmit, handleInputChange, error } =
  //   useChat({
  //       api: "/api/chat",
  //     });
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/chat2" });
  const status = "in_progress";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="lg:pl-72 flex flex-1 flex-col p-4">
        {messages.length ? (
          <Chat messages={messages} status={status} />
        ) : (
          <EmptySlate />
        )}
        <Inputer submitMessage={handleSubmit} onChange={handleInputChange} />
      </main>
    </div>
  );
}
