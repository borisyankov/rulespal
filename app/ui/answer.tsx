import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Citation from './citation';
import type { Root, Content, Text, RootContent } from 'mdast';
import type { Game, RulesUIMessage } from '../lib/definitions';
import { messageText } from '../lib/utils';

type Props = {
  m: RulesUIMessage;
  game: Game;
  isLoading: boolean;
};

const appendLoading = () => {
  const findLastTextNode = (node: Content): Text | null => {
    if (node.type === 'text') {
      return node as Text;
    }
    if ('children' in node && node.children && node.children.length > 0) {
      return findLastTextNode(node.children[node.children.length - 1]);
    }
    return null;
  };

  return (tree: Root) => {
    if ('children' in tree && tree.children && tree.children.length) {
      const lastNode = findLastTextNode(tree as unknown as RootContent);
      if (lastNode) {
        lastNode.value += ' ⬤';
      }
    }
  };
};

export default function Answer({ m, game, isLoading }: Props) {
  const citations = m.metadata?.citations ?? [];
  return (
    <div className="prose prose-zinc mb-10 dark:prose-invert">
      <Markdown
        remarkPlugins={isLoading ? [remarkGfm, appendLoading] : [remarkGfm]}
      >
        {messageText(m)}
      </Markdown>
      {!isLoading && citations.length > 0 && (
        <div className="not-prose mt-2 flex flex-wrap gap-2">
          {citations.map((citation) => (
            <Citation key={citation.start} citation={citation} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
