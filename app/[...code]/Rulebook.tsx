import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import remarkTocCollapse from '../lib/remark-toc-collapse';
import type { Game } from '../lib/definitions';
import Thumbnail from '../ui/thumbnail';
import GameTitle from '../ui/game-title';

type Props = {
  game: Game;
  resource: string;
};

export default async function Rulebook({ game, resource }: Props) {
  const gameRulebook = (
    await import(`../../data/rulebooks/${game.code}-${resource}.md`)
  ).default;
  return (
    <div>
      <GameTitle game={game} />
      <Markdown
        className="marker:primary prose-summary:bg-red-500 prose
      max-w-screen-sm py-5
      dark:prose-invert prose-h1:hidden
      prose-h2:mb-4 prose-h2:mt-7 prose-h2:text-3xl
      prose-h2:tracking-wider
      prose-h3:mb-3
      prose-h3:mt-6 prose-h3:text-2xl
      prose-h3:tracking-wider prose-h4:mt-4 prose-h4:text-xl
      prose-h4:tracking-wider
      prose-h5:text-lg prose-h5:font-bold prose-h5:tracking-wider prose-h6:font-bold
      prose-h6:tracking-wider prose-p:my-3 prose-p:leading-normal prose-a:font-bold
      prose-a:decoration-primary prose-a:decoration-2 prose-ol:my-2
      prose-ul:my-2 prose-ul:pl-5 prose-li:my-0
      prose-li:p-0 prose-hr:my-8
      "
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        remarkPlugins={[remarkGfm, remarkToc, remarkTocCollapse]}
      >
        {gameRulebook}
      </Markdown>
    </div>
  );
}
