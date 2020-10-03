import remarkA11yEmoji from '@fec/remark-a11y-emoji'

const remarkPlugins = [
  // Make emojis accessible.
  remarkA11yEmoji
]

const rehypePlugins = [
  
]

export const mdxOptions = {
  remarkPlugins,
  rehypePlugins
}
