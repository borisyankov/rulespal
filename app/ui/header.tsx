import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="py-2">
      <div className="flex w-full m-auto px-2 max-w-screen-md flex-row items-center justify-between gap-8 text-white/80">
        {children}
      </div>
    </header>
  );
}
