import { Message } from "ai/react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const roleToIconMap: Record<
  Message["role"],
  React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>
> = {
  system: QuestionMarkCircleIcon,
  user: UserCircleIcon,
  function: QuestionMarkCircleIcon,
  assistant: BookOpenIcon,
  data: QuestionMarkCircleIcon,
};

type Props = {
  m: Message;
};

export default function SingleMessage({ m }: Props) {
  const Icon = roleToIconMap[m.role];
  return (
    <div
      key={m.id}
      className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion"
      style={{ color: "white" }}
    >
      <Icon className="w-6 h-6" />
      {m.role !== "data" && m.content}
      {m.role === "data" && (
        <>
          {(m.data as any).description}
          <br />
          <pre className={"bg-gray-200"}>{JSON.stringify(m.data, null, 2)}</pre>
        </>
      )}
      <br />
      <br />
    </div>
  );
}
