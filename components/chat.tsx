import { AssistantStatus, Message } from "ai/react";
import Question from "./question";
import Answer from "./answer";

type Props = {
  messages: Message[];
  status: AssistantStatus;
};

export default function Chat({ messages, status }: Props) {
  return (
    <div className="flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion">
      {messages.map((m: Message) =>
        m.role === "user" ? (
          <Question key={m.id} m={m} />
        ) : (
          <Answer key={m.id} m={m} />
        )
      )}
      {status === "in_progress" && (
        <span className="loading loading-dots loading-lg" />
      )}
    </div>
  );
}
