import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript'
import syntaxTheme from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)

interface Props {
  code: string
  className?: string
}

export const Code = ({ code, className = 'js' }: Props): JSX.Element => {
  return (
    <>
      <SyntaxHighlighter
        className="syntax"
        customStyle={{
          padding: '40px 0',
        }}
        language={className.replace('language-', '')}
        style={syntaxTheme}
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
      <style global jsx>{`
        .syntax code {
          font-size: 0.9rem;
          font-family: var(--font-mono);
        }

        .syntax code > span {
          display: block;
          margin-top: var(--space-2);
        }

        .syntax code > span:first-child {
          margin-top: 0;
        }

        .syntax code > span:last-child {
          display: none;
        }

        .remark-code-title {
          background-color: ${syntaxTheme.hljs.background};
          color: ${syntaxTheme.hljs.color};
          font-family: var(--font-mono);
          font-size: 0.8em;
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
          margin-bottom: -0px !important;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          opacity: 0.8;
        }
      `}</style>
    </>
  )
}
