import { AssistantStatus, Message } from "ai/react";
import SingleMessage from "./message";

// roleToColorMap'[m.role]

type Props = {
  messages: Message[];
  status: AssistantStatus;
};

export default function Chat({ messages, status }: Props) {
  return (
    <div className="self-stretch">
      {messages.map((m: Message) => (
        <SingleMessage key={m.id} m={m} />
      ))}
      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}
    </div>
  );
}
