import Link from "next/link";
import { Quote } from "lucide-react"

type Props = {
  text: string;
};

export default function Citation({ text }: Props) {
  const code = '7_wonders';
  if (!text || text.length === 0) {
    return null;
  }
  return (
    <Link href={`/${code}/rules`} title={text}>
      <span className="inline-block bg-primary rounded-full ml-1 align-middle">
        <Quote size={20} className="p-1	text-gray-50" />
      </span>
      {text}
      <span className="inline-block bg-primary rounded-full ml-1 align-middle">
        <Quote size={20} className="p-1	text-gray-50" />
      </span>
    </Link>
  );
}
