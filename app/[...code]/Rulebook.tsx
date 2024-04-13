import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import remarkTocCollapse from '../lib/remark-toc-collapse';

type Props = {
  code: string;
  resource: string;
};

export default async function Rulebook({ code, resource }: Props) {
  const gameRulebook = (
    await import(`../../data/rulebooks/${code}_${resource}.md`)
  ).default;
  return (
    <Markdown
      className="prose dark:prose-invert max-w-xl
      prose-hr:my-8 prose-p:leading-normal
      prose-li:my-0 prose-li:p-0 marker:primary
      prose-ul:pl-5
      prose-summary:bg-red-500
      prose-a:decoration-primary prose-a:decoration-2
      prose-p:my-3 prose-ul:my-2 prose-ol:my-2
      prose-h1:hidden
      prose-h2:text-4xl prose-h2:mt-7 prose-h2:mb-4 
      prose-h3:text-3xl prose-h3:mt-6 prose-h3:mb-3
      prose-h4:text-2xl prose-h4:mt-4
      prose-h5:text-xl prose-h5:font-bold
      prose-h6:font-bold
      "
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[
        remarkGfm,
        remarkToc, 
        remarkTocCollapse,
      ]}
    >
      {gameRulebook}
    </Markdown>
  );
}
