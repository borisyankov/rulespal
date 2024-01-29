'use client';

type Props = {
  index: number;
};

export default function CitationLink ({ index }: Props) {
  return (
    <button type="button" className="bg-slate-500 rounded-full size-6 text-xs p-0.5" onClick={() => { alert('yolo'); }}>
      {index}
    </button>
  );
}
