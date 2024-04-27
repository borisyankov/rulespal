'use client';

import { useChat } from 'ai/react';
import EmptyState from '@/app/ui/empty-state';
import MessageList from '@/app/ui/message-list';
import UserInput from '@/app/ui/user-input';
import type { Game } from '../lib/definitions';
import type { FormEvent } from 'react';
import GameTitle from '../ui/game-title';

type Props = {
  game: Game;
};

export default function Chat({ game }: Props) {
  const { messages, isLoading, stop, data, handleInputChange, handleSubmit } =
    useChat({
      id: game.code,
      // initialMessages - taken from the localStorage!!
    });
  function submitWithGame(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e, { data: { bggid: game.bggid.toString() } });
  }
  return (
    <main className="w-full max-w-screen-sm mx-auto">
      <GameTitle game={game} />
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
    </main>
  );
}
