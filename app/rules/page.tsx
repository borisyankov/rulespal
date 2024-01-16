"use client";

import Link from "next/link";
import assets from "@/rulebooks/assets";
import { RulebookAsset } from "@/rulebooks/assets";

export default function Rules() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col p-4">
      {assets.map((asset: RulebookAsset) => (
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
