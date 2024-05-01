'use client';

import { FrownIcon } from 'lucide-react';

type Props = {
  search: string;
};

export default function NoResults({ search }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 self-center p-4 text-muted-foreground">
      <FrownIcon className="size-10" />
      <div className="">No results for &quot;{search}&quot;</div>
    </div>
  );
}
