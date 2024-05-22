import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

type HistoryItemProps = {
  who: string;
  what: string;
  when: string;
};

export default function HistoryItemComponent(props: HistoryItemProps) {
  const { who, what, when } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        borderBottom: '1px solid #333',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '0.8em' }}>{who}</div>
        <div style={{ fontSize: '0.8em' }}>{when}</div>
      </div>
      <div style={{ fontSize: '1em' }}>
        <Markdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={dracula}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {what}
        </Markdown>
      </div>
    </div>
  );
}
