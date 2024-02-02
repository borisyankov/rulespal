import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  code: string;
};

export default async function Rulebook({ code }: Props) {
  const gameRulebook = (
    await import(`../../data/rulebooks/${code}_rulebook.md`)
  ).default;
  return (
    <Markdown
      className="prose prose-zinc mb-10 dark:prose-invert mx-auto"
      remarkPlugins={[remarkGfm]}
    >
      {gameRulebook}
    </Markdown>
  );
}
