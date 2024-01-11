"use client";

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import Chat from "./ui/chat";
import Gamebar from "./ui/gamebar";
import Inputer from "./ui/inputer";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/chat" });
  const status = "in_progress";
  return (
    <div className="min-h-screen flex flex-col">
      <Gamebar />
      <main className="lg:pl-72 flex flex-1 flex-col p-4">
        {messages.length ? (
          <Chat messages={messages} status={status} />
        ) : (
          <EmptyState />
        )}
        <Inputer submitMessage={handleSubmit} onChange={handleInputChange} />
      </main>
    </div>
  );
}
