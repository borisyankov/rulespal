import React from 'react';
import Markdown, { type ExtraProps } from 'react-markdown';
import type { Message } from 'ai/react';
import remarkGfm from 'remark-gfm';
import Citation from './citation';
import type { Root, Content, Text, RootContent } from 'mdast';
import type { Game } from '../lib/definitions';

type Props = {
  m: Message;
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
                      <Citation key={part} text={part} game={game} />
                    ),
                  );
                }
                return child;
              })}
            </p>
          );
        },
        pre(
          props: React.ClassAttributes<HTMLElement> &
            React.HTMLAttributes<HTMLElement> &
            ExtraProps,
        ) {
          if (!React.isValidElement(props.children)) {
            return null;
          }
          const childrenProps = props.children.props as { children: string };
          return <Citation text={childrenProps.children} game={game} />;
        },
        code(
          props: React.ClassAttributes<HTMLElement> &
            React.HTMLAttributes<HTMLElement> &
            ExtraProps,
        ) {
          return <Citation text={String(props.children)} game={game} />;
        },
      }}
    >
      {m.content}
    </Markdown>
  );
}
