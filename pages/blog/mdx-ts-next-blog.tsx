import { NextPage } from 'next'

import { Post } from 'layouts/Post'
import Content from 'posts/001.mdx'
import type { BlogSettings } from 'types/blog'

export const settings: BlogSettings = {
  id: '001',
  title: 'Building a blog with MDX, Next.js, and TypeScript',
  description:
    'My approach to building a blog that is both type-safe, and easy to use.',
  publishedOn: new Date('2020-10-29').toString(),
}

const MdxTsNext: NextPage = () => (
  <Post {...settings}>
    <Content />
  </Post>
)

export default MdxTsNext
