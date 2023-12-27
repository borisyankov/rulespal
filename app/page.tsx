"use client";

import { experimental_useAssistant as useAssistant } from "ai/react";
import EmptySlate from "@/components/empty-slate";
import Chat from "../components/chat";
import Navbar from "../components/navbar";
import Inputer from "../components/inputer";

export default function Home() {
  
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/chat",
    });
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="lg:pl-72 flex flex-1 flex-col p-4">
        {messages.length ? (
          <Chat messages={messages} status={status} />
        ) : (
          <EmptySlate />
        )}
        <Inputer submitMessage={submitMessage} onChange={handleInputChange} />
      </main>
    </div>
  );
}
