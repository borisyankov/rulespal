import { Message } from "ai/react";

type Props = {
  m: Message;
};

export default function Annotation({ m }: Props) {
  return (
    <div>[ANNOTATION !!!]</div>
  );
}
