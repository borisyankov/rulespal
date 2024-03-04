import React from 'react';
import Markdown, { ExtraProps } from 'react-markdown';
import { Message } from 'ai/react';
import remarkGfm from 'remark-gfm';
import Citation from './citation';
import { Root, Content, Text, RootContent } from 'mdast';

type Props = {
  m: Message;
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

export default function Answer({ m, isLoading }: Props) {
  return (
    <Markdown
      className="prose prose-zinc mb-10 dark:prose-invert"
      remarkPlugins={isLoading ? [remarkGfm, appendLoading] : [remarkGfm]}
      components={{
        p(
          props: React.ClassAttributes<HTMLElement> &
            React.HTMLAttributes<HTMLElement> &
            ExtraProps,
        ) {
          return (
            <p>
              {React.Children.map(props.children, (child) => {
                if (typeof child === 'string') {
                  const regex = /(?:【([^】]*)】|【(.*?)$)/g;
                  const parts = child.split(regex);
                  return parts.map((part, index) =>
                    index % 2 === 0 ? (
                      part
                    ) : (
                      <Citation key={part} text={part} />
                    ),
                  );
                }
                return child;
              })}
            </p>
          );
        },
      }}
    >
      {m.content}
    </Markdown>
  );
}
