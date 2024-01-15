"use client";

import Markdown from "react-markdown";
import rulebook from "/rulebooks/scout_rulebook.md";
import remarkGfm from "remark-gfm";

export default function Rules({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col max-w-lg mx-auto">
      <Markdown className="prose prose-zinc dark:prose-invert mb-10"  remarkPlugins={[remarkGfm]}>
        {rulebook.toString()}
      </Markdown>
    </div>
  );
}
