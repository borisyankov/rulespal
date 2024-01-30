import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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

function code(props:  React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & ExtraProps) {
  const { children, className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter
      PreTag="div"
      language={match[1]}
      style={twilight}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

function p(props:  React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & ExtraProps) {
  return (
    <p>
      {React.Children.map(props.children, child => {
        if (typeof child === 'string') {
          const regex = /【(\d+)†source】/g;
          const parts = child.split(regex);
          return parts.map((part, index) =>
            index % 2 === 0 ? part : <Citation key={part} index={Number(part)} />
          );
        }
        return child;
      })}
    </p>
  );
};

export default function Answer({ m, isLoading }: Props) {
  return (
    <Markdown
      className="prose prose-zinc dark:prose-invert mb-10"
      remarkPlugins={isLoading ? [remarkGfm, appendLoading] : [remarkGfm]}
      components={{
        code,
        p,
      }}
    >
      {m.content}
    </Markdown>
  );
}
