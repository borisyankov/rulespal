import { BookOpenText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="text-center">
        <BookOpenText className="mx-auto h-8 w-8 stroke-[1px] opacity-75" />
        <h2>Ask any rules question.<br/>Get answers directly from the rule book.</h2>
      </div>
    </div>
  );
}
