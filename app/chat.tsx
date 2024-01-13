'use client'

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import MessageList from "@/app/ui/message-list";
import QuestionInput from "@/app/ui/question-input";

export default function Chat() {
  const options = useChat({
    api: "/api/chat",
  });
  console.log(options);
  const { messages, isLoading, stop, handleInputChange, handleSubmit } = options;
  return (
    <>
      {messages.length ? (
        <MessageList messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyState />
      )}
      <QuestionInput
        isLoading={isLoading}
        stop={stop}
        submitMessage={handleSubmit}
        onChange={handleInputChange}
      />
    </>
  );
}
