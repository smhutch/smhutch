import { MdxProps, MDXProvider } from '@mdx-js/react'

import { Code } from '../Code'
import { Text } from '../Text'
import type { Tag } from '../Text/types'

interface TextProps {
  el: Tag
  className?: string
}

function text(textProps: TextProps) {
  return function MDXText(mdxProps: MdxProps) {
    return <Text {...textProps} {...mdxProps} />
  }
}

function Pre(props) {
  // Strip <pre> tag, with the assumption that
  // ``` is only used for Code blocks.
  // this prevents MDX from creating nested `pre` tags.
  return <>{props.children}</>
}

const component = {
  code: Code,
  h1: text({ el: 'h1' }),
  h2: text({ el: 'h2' }),
  h3: text({ el: 'h3' }),
  h4: text({ el: 'h4' }),
  h5: text({ el: 'h5' }),
  h6: text({ el: 'h6' }),
  p: text({ el: 'p' }),
  pre: Pre,
}

export const MDX: React.FC = ({ children }) => {
  return <MDXProvider components={component}>{children}</MDXProvider>
}
