"use client";

import { notFound } from 'next/navigation';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import assets from "@/rulebooks/assets";
import { RulebookAsset } from "@/rulebooks/assets";

export default function Rules({ params }: { params: { id: string } }) {
  const id = params.id;
  const asset = assets.find((asset: RulebookAsset) => asset.bggid === +id);
  if (!asset) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen flex-col max-w-lg mx-auto p-4">
      <Markdown className="prose prose-zinc dark:prose-invert mb-10"  remarkPlugins={[remarkGfm]}>
        {asset.rulebook.toString()}
      </Markdown>
    </div>
  );
}
