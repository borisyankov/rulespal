"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Themer() {
  const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem("isdark") || "false")
  );
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, [isdark]);

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        checked={isdark}
        onChange={() => setIsdark(!isdark)}
      />

      <SunIcon className="swap-on w-10 h-10" />
      <MoonIcon className="swap-off w-10 h-10" />
    </label>
  );
}
