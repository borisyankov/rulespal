"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Themer() {
  const { theme, setTheme } = useTheme();

  // if (theme === undefined) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <div className="flex cursor-pointer flex-row">
      <Icon
        className="size-10 rounded-full bg-gray-500/10 p-2"
        suppressHydrationWarning
        onClick={toggleTheme}
      />
    </div>
  );
}
