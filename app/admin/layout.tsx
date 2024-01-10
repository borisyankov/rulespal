import NavBar from "@/app/ui/navbar";
import Themer from "@/app/ui/themer";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl flex-col p-4">
      <div className="flex justify-between mb-8">
        <div className="flex">
          <AdjustmentsVerticalIcon className="text-primary w-10 h-10 p-2" />
          <NavBar />
        </div>
        <Themer />
      </div>
      <main>{children}</main>
    </div>
  );
}


