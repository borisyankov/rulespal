import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      className="prose lg:prose-lg md:prose mb-10 dark:prose-invert px-4 pt-12 mx-auto
      prose-hr:my-8 prose-p:leading-relaxed
      prose-li:my-0 prose-li:p-0 marker:primary
      prose-ul:pl-5
      marker:text-green 
      prose-a:decoration-violet-600 prose-a:decoration-2
      prose-p:my-3 prose-ul:my-2 prose-ol:my-2
      prose-h1:mt-8 prose-h2:mt-7 prose-h3:mt-6
      prose-h1:mb-5 prose-h2:mb-4 prose-h3:mb-3
      prose-h4:mt-4
      prose-h5:font-bold
      prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl"
      remarkPlugins={[remarkGfm]}
    >
      {gameRulebook}
    </Markdown>
  );
}
