import Link from "next/link";
import { Quote } from "lucide-react"

type Props = {
  index: number;
  data: any;
};

export default function Citation ({ index, data }: Props) {
  const code = '7_wonders';
  const citation = data[0].citations[index];
  return (
    <Link className="inline-block bg-primary rounded-full ml-1 align-middle" href={`/${code}/rules#${citation.start}-${citation.length}`}>
      <Quote size={20} className="p-1	text-gray-50" />
    </Link>
  );
}
