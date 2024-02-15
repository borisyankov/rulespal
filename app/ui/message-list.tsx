import { Message } from "ai/react";
import Question from "./question";
import Answer from "./answer";
import Loading from "./loading";

type Props = {
  messages: Message[];
  isLoading: boolean;
  data: any;
};

export default function MessageList({ messages, isLoading, data }: Props) {
  return (
    <div className="scrollbar flex-1 p-4 overflow-y-auto text-base mx-auto gap-3 w-full max-w-screen-md">
      {messages.map((m: Message, index) =>
        m.role === "user" ? (
          <Question key={m.id} m={m} />
        ) : (
          <Answer key={m.id} m={m} isLoading={isLoading && index === messages.length - 1} data={data} />
        )
      )}
      {isLoading && messages[messages.length - 1].role === 'user' && (
        <Loading />
      )}
    </div>
  );
}
