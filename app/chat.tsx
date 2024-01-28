'use client'

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import MessageList from "@/app/ui/message-list";
import QuestionInput from "@/app/ui/question-input";
import { Game } from "./lib/definitions";

type Props = {
  game: Game;
}

export default function Chat({ game }: Props) {
  const options = useChat({
    api: "/api/chat",
  });
  const { messages, isLoading, stop, handleInputChange, handleSubmit } = options;
  return (
    <>
      {messages.length ? (
        <MessageList messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyState game={game} />
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
