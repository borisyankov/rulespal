'use client'

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import MessageList from "@/app/ui/message-list";
import QuestionInput from "@/app/ui/question-input";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  const status = "in_progress";
  return (
    <>
      {messages.length ? (
        <MessageList messages={messages} status={status} />
      ) : (
        <EmptyState />
      )}
      <QuestionInput
        submitMessage={handleSubmit}
        onChange={handleInputChange}
      />
    </>
  );
}
