import { Message } from "ai/react";
import Question from "./question";
import Answer from "./answer";
import Loading from "./loading";
import { Game } from "../lib/definitions";
import { ChatScrollAnchor } from "../lib/chat-scroll-anchor";

type Props = {
  game: Game;
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({ game, messages, isLoading }: Props) {
  return (
    <div className="scrollbar flex-1 p-4 overflow-y-auto text-base mx-auto gap-3 w-full max-w-screen-md">
      {messages.map((m: Message, index) =>
        m.role === "user" ? (
          <Question key={m.id} m={m} />
        ) : (
          <Answer key={m.id} m={m} game={game} isLoading={isLoading && index === messages.length - 1} />
        )
      )}
      {isLoading && messages[messages.length - 1].role === 'user' && (
        <Loading />
      )}
      <ChatScrollAnchor trackVisibility />
    </div>
  );
}
