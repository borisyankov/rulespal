'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import EmptyState from '@/app/ui/empty-state';
import MessageList from '@/app/ui/message-list';
import UserInput from '@/app/ui/user-input';
import type { Game, RulesUIMessage } from '../lib/definitions';

type Props = {
  game: Game;
};

export default function Chat({ game }: Props) {
  const { messages, sendMessage, status, stop } = useChat<RulesUIMessage>({
    id: game.code,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const isLoading = status === 'submitted' || status === 'streaming';
  function submitWithGame(text: string) {
    sendMessage({ text }, { body: { bggid: game.bggid.toString() } });
  }
  return (
    <main className="size-full max-w-screen-sm mx-auto">
      {messages.length ? (
        <MessageList game={game} messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyState game={game} />
      )}
      <UserInput isLoading={isLoading} stop={stop} onSend={submitWithGame} />
    </main>
  );
}
