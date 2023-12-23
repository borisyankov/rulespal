import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function EmptySlate() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="text-center">
        <InformationCircleIcon className="mx-auto h-12 w-12 stroke-[1px]" />
        <h2>Ask any rules question.<br/>Get answers directly from the rule book.</h2>
      </div>
    </div>
  );
}
