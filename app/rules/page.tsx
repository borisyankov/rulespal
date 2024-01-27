"use client";

import Link from "next/link";
import assets from "@/data/games";
import { Game } from "../lib/definitions";

export default function Rules() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col p-4">
      {assets.map((asset: Game) => (
        <Link
          key={asset.bggid}
          href={`/rules/${asset.bggid}`}
          className="mb-4 block"
        >
          {asset.name}
        </Link>
      ))}
    </div>
  );
}
