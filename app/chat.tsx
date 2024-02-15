'use client'

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import MessageList from "@/app/ui/message-list";
import QuestionInput from "@/app/ui/question-input";
import { Game } from "./lib/definitions";
import { FormEvent } from "react";

type Props = {
  game: Game;
}

export default function Chat({ game }: Props) {
  const options = useChat({
    api: "/api/chat",
  });
  const { messages, isLoading, stop, data, handleInputChange, handleSubmit } = options;
  function submitWithGame(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e, { data: { bggid: game.bggid.toString() } });
  }
  return (
    <>
      {messages.length ? (
        <MessageList messages={messages} isLoading={isLoading} data={data} />
      ) : (
        <EmptyState game={game} />
      )}
      <QuestionInput
        isLoading={isLoading}
        stop={stop}
        submitMessage={submitWithGame}
        onChange={handleInputChange}
      />
    </>
  );
}
