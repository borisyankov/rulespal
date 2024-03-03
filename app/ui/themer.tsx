"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Themer() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex cursor-pointer flex-row">
      <SunIcon className="size-10 rounded-full bg-gray-500/10 p-2 hidden dark:block hover:bg-gray-500/30" onClick={toggleTheme} />
      <MoonIcon className="size-10 rounded-full bg-gray-500/10 p-2 is-light dark:hidden hover:bg-gray-500/30" onClick={toggleTheme} />
    </div>
  );
}
