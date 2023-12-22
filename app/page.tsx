'use client';

import { experimental_useAssistant as useAssistant } from 'ai/react';

import Inputer from "../components/inputer";
import Chat from "../components/chat";
import Navbar from "../components/navbar";
import EmptySlate from '@/components/empty-slate';

export default function Home() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
  useAssistant({
      api: '/api/chat',
    });
  return (
    <main className="flex min-h-screen flex-col items-stretch p-8">
      <Navbar />
      {messages.length ?
      <Chat messages={messages} status={status} /> : <EmptySlate />}
      <Inputer submitMessage={submitMessage} onChange={handleInputChange} />
    </main>
  );
}
