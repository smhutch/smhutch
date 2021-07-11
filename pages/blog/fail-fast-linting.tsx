import { NextPage } from 'next'

import { Post } from 'layouts/Post'
import Content from 'posts/002.mdx'
import type { BlogSettings } from 'types/blog'

export const settings: BlogSettings = {
  id: '002',
  title: 'Automating pre-commit checks',
  description:
    'Using lint-staged and husky to run eslint, tests, and TypeScript checks pre-commit.',
  publishedOn: new Date('2020-10-31').toString(),
}

const MdxTsNext: NextPage = () => (
  <Post {...settings}>
    <Content />
  </Post>
)

export default MdxTsNext
