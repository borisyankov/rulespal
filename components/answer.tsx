import { Message } from "ai/react";
import Markdown from "react-markdown";

type Props = {
  m: Message;
};

export default function Answer({ m }: Props) {
  console.log('@@@ Message', m);
  return (
    <Markdown className="answer mb-10">
      {m.content}
    </Markdown>
  );
}
