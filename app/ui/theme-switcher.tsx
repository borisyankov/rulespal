"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import RoundButton from "./round-button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <RoundButton>
      <SunIcon className="size-5 hidden dark:block" onClick={toggleTheme} />
      <MoonIcon className="size-5 is-light dark:hidden" onClick={toggleTheme} />
    </RoundButton>
  );
}
