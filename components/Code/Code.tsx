import cx from 'clsx'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneLight'
import React from 'react'
import { resolve } from 'styled-jsx/css'

const preStyles = resolve`
  padding: 2rem;
  overflow-y: auto;
  max-width: 1000px;
`

interface Props {
  children: string
  className?: string
}

export const Code: React.FC<Props> = ({
  children,
  className = 'javascript',
}) => {
  // Typecasting is not guaranteed, but nothing bad will happen
  // if a language match is not found.
  const language = className.replace(/language-/, '') as Language

  return (
    <>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={cx(className, preStyles.className)}
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </div>
        )}
      </Highlight>
      {preStyles.styles}
    </>
  )
}
