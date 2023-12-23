import { Message } from "ai/react";

// const roleToIconMap: Record<
//   Message["role"],
//   React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref">>
// > = {
//   system: QuestionMarkCircleIcon,
//   user: UserCircleIcon,
//   function: QuestionMarkCircleIcon,
//   assistant: BookOpenIcon,
//   data: QuestionMarkCircleIcon, // special handling needed
// };

type Props = {
  m: Message;
};

export default function Answer({ m }: Props) {
  return (
    <div
      className="mb-10 text-base"
    >
      {m.content}
    </div>
  );
}
