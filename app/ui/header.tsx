import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="p-2 mr-3">
      <div className="flex w-full m-auto max-w-screen-sm flex-row items-center justify-between gap-8 text-white/80">
        {children}
      </div>
    </header>
  );
}
