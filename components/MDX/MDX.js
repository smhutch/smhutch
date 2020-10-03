import { MDXProvider } from '@mdx-js/react'

import { Code } from '../Code'
import { Stack } from '../Stack'
import { Text } from '../Text'

function text(styleProps) {
  return function MDXText(mdxProps) {
    return <Text {...styleProps} {...mdxProps} />
  }
}

function wrapper(props) {
  return (
    <main className="container">
      <Stack className="pt4 pb6" el="article" gap={4} {...props} />
    </main>
  )
}

export const components = {
  code: Code,
  h1: text({ el: 'h1' }),
  h2: text({ className: 'pt3', el: 'h2' }),
  h3: text({ el: 'h3' }),
  h4: text({ el: 'h4' }),
  h5: text({ el: 'h5' }),
  h6: text({ el: 'h6' }),
  p: text({ el: 'p' }),
  wrapper
}

export const MDX = props => {
  return (
    <MDXProvider components={components}>
      {props.children}
    </MDXProvider>
  )
}
