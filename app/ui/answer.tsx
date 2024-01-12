import { Message } from "ai/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {twilight} from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  m: Message;
};

export default function Answer({ m }: Props) {
  return (
    <Markdown
      className="prose prose-zinc dark:prose-invert mb-10"
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const {children, className, node, ...rest} = props
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
      }}
    >
      {m.content}
    </Markdown>
  );
}
