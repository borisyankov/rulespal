'use client';

type Props = {
  index: number;
};

export default function Citation ({ index }: Props) {
  return (
    <button type="button" className="bg-primary rounded-full size-6 text-xs p-0.5 ml-2" onClick={() => { alert('yolo'); }}>
      {index}
    </button>
  );
}
