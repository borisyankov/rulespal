"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Themer() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <div className="flex cursor-pointer flex-row">
      <Icon
        className="h-10 w-10 rounded-full bg-gray-500/10 p-2"
        onClick={toggleTheme}
      />
    </div>
  );
}
