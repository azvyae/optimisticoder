'use client';

import Image from 'next/image';
import React from 'react';
import { FiCopy } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  lucario as style,
  gruvboxDark as url,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import unwrap from 'remark-unwrap-images';

interface MarkdownUIProps {
  markdown?: string;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function MarkdownUI({ markdown }: MarkdownUIProps) {
  return (
    <ReactMarkdown
      className="stories-body dark:prose-invert max-w-none prose-headings:break-words mx-auto prose prose-table:font-body prose-table:border prose-td:px-2 prose-td:border prose-th:text-light prose-th:py-1 prose-th:border prose-th:border-dark  prose-th:dark:border-light prose-th:bg-primary prose-pre:text-light prose-pre:px-0 prose-lg sm:prose-xl prose-optimisticoder font-article prose-h2:sm:text-3xl prose-h3:sm:text-2xl prose-h4:sm:text-xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h4:font-bold hover:prose-a:brightness-125"
      components={{
        h1: ({ ...props }) => <h2 {...props} />,
        h2: ({ ...props }) => <h3 {...props} />,
        h3: ({ ...props }) => <h4 {...props} />,
        h4: ({ ...props }) => <h4 {...props} />,
        h5: ({ ...props }) => <h4 {...props} />,
        h6: ({ ...props }) => <h4 {...props} />,
        img({ alt, src, className, ...props }) {
          return (
            <figure>
              <Image
                draggable={false}
                className={`${className} max-h-[50vh] rounded-lg object-scale-down w-fit mx-auto`}
                {...props}
                src={src ?? ''}
                width={1280}
                loading="lazy"
                height={1280}
                alt={alt ?? ''}
              />
              <figcaption className="mt-1 font-body text-xs sm:text-sm text-[#7d837f] dark:brightness-125 text-center">
                <em>{alt}</em>
              </figcaption>
            </figure>
          );
        },
        code({ ref, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div
              ref={ref as React.LegacyRef<HTMLDivElement>}
              className="relative"
            >
              <code className="absolute pt-2 pl-3 text-xs rounded-br-md text-[#a4a4a4]">
                {match[1]}
              </code>
              <button
                className="absolute flex items-center justify-center top-0 right-0 p-2 rounded-bl-md transition-colors bg-[#5085cf] hover:bg-[#4674b4]"
                title="Copy to clipboard"
                onClick={() => {
                  copyToClipboard(String(children).replace(/\n$/, ''));
                }}
              >
                <FiCopy className="text-slate-50" size={12} />
              </button>
              <SyntaxHighlighter
                {...props}
                customStyle={{
                  paddingTop: match[1] === 'url' ? 10 : 48,
                  paddingLeft: match[1] === 'url' ? 40 : 12,
                  paddingBottom: match[1] === 'url' ? 8 : 12,
                  paddingRight: match[1] === 'url' ? 36 : 12,
                  marginBottom: 4,
                }}
                style={match[1] === 'url' ? url : style}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              {...props}
              className={`${className} dark:text-[#fabf28] text-[#bc9020] break-words whitespace-pre-wrap`}
            >
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[unwrap, gfm]}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export { MarkdownUI };
