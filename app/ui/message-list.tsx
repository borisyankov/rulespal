import { Message } from "ai/react";
import Question from "./question";
import Answer from "./answer";
import Loading from "./loading";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: Props) {
  return (
    <div className="flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion">
      {messages.map((m: Message, index) =>
        m.role === "user" ? (
          <Question key={m.id} m={m} />
        ) : (
          <Answer key={m.id} m={m} isLoading={isLoading && index === messages.length - 1} />
        )
      )}
      {isLoading && messages[messages.length - 1].role === 'user' && (
        <Loading />
      )}
    </div>
  );
}
