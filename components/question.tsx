import { Message } from "ai/react";

type Props = {
  m: Message;
};

export default function Question({ m }: Props) {
  return (
    <div className="my-2 font-semibold text-2xl">{m.content}</div>
  );
}
