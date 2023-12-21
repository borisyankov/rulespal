"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Themer() {
  const [theme, setTheme] = useState<string>("unknown");

  useEffect(() => {
    console.log("Themer: useEffect", localStorage.getItem("theme"));
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme);
  };

  return (
    <label className="swap swap-rotate">
      <MoonIcon
        className={(theme === "dark" ? "swap-on" : "swap-off") + " w-10 h-10"}
        onClick={toggleTheme}
      />
      <SunIcon
        className={(theme !== "dark" ? "swap-on" : "swap-off") + " w-10 h-10"}
        onClick={toggleTheme}
      />
    </label>
  );
}
