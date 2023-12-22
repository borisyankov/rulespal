import { Message } from "ai/react";

type Props = {
  m: Message;
};

export default function SingleMessage({ m }: Props) {
  return (
    <div key={m.id} className="whitespace-pre-wrap" style={{ color: "white" }}>
      F<strong>{`${m.role}: `}</strong>
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
