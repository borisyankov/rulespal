'use client'

import { useChat } from "ai/react";
import EmptyState from "@/app/ui/empty-state";
import MessageList from "@/app/ui/message-list";
import UserInput from "@/app/ui/user-input";
import { Game } from "./lib/definitions";
import { FormEvent } from "react";

type Props = {
  game: Game;
}

export default function Chat({ game }: Props) {
  const { messages, isLoading, stop, data, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });;
  function submitWithGame(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e, { data: { bggid: game.bggid.toString() } });
  }
  return (
    <>
      {messages.length ? (
        <MessageList game={game} messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyState game={game} />
      )}
      <UserInput
        isLoading={isLoading}
        stop={stop}
        submitMessage={submitWithGame}
        onChange={handleInputChange}
      />
    </>
  );
}
