import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className=" top-0 inset-x-0 bg-primary py-1">
      <div className="flex w-full m-auto px-2 max-w-screen-md flex-row items-center justify-between gap-8 text-white/80">
        {children}
      </div>
    </header>
  );
}
