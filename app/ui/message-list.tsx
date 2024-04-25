import { useEffect, useRef } from 'react';
import type { Message } from 'ai/react';
import Question from './question';
import Answer from './answer';
import Progress from './progress';
import type { Game } from '../lib/definitions';

type Props = {
  game: Game;
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({ game, messages, isLoading }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!listRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      listRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
    resizeObserver.observe(listRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  return (
    <div
      className="w-full flex-1 gap-3 overflow-y-auto p-2 text-base"
      ref={listRef}
    >
      {messages.map((m: Message, index) =>
        m.role === 'user' ? (
          <Question key={m.id} m={m} />
        ) : (
          <Answer
            key={m.id}
            m={m}
            game={game}
            isLoading={isLoading && index === messages.length - 1}
          />
        ),
      )}
      {isLoading && messages[messages.length - 1].role === 'user' && (
        <Progress />
      )}
    </div>
  );
}
