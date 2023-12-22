'use client';

import { useChat, experimental_useAssistant as useAssistant } from 'ai/react';

console.log('@@@@@@@@ useChat');
console.log(useChat)

import Inputer from "./inputer";
import Messages from "./messages";
import Themer from "./themer";

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
      <Messages messages={messages} status={status} />
      <Inputer submitMessage={submitMessage} onChange={handleInputChange} />
    </main>
  );
}
