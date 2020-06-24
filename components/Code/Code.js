import cn from 'classnames'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneLight'
import React from 'react'
import { resolve } from 'styled-jsx/css'

const preStyles = resolve`
  padding: 2rem;
  overflow-y: auto;
  max-width: 1000px;
`

export const Code = ({ children, className = 'js' }) => {
  const language = className.replace(/language-/, '')

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
            className={cn(className, preStyles.className)}
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
