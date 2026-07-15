import type { UIMessage } from "ai";
import { messageText } from "@/app/lib/utils";

type Props = {
  m: UIMessage;
};

export default function Question({ m }: Props) {
  return (
    <div className="my-4 text-2xl">{messageText(m)}</div>
  );
}
