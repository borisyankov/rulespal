'use client';

import { experimental_useAssistant as useAssistant } from 'ai/react';

import Inputer from "../components/inputer";
import Chat from "../components/chat";
import Themer from "../components/themer";

export default function Home() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
  useAssistant({
      api: '/api/chat',
    });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Themer />
      <h1 className="text-5xl">Dune Imperium</h1>
      <h2>Ask any rules question. Get answers directly from the rule book.</h2>
      <Chat messages={messages} status={status} />
      <Inputer submitMessage={submitMessage} onChange={handleInputChange} />
    </main>
  );
}
