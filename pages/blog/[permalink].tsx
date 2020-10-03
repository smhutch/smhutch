import hydrate from 'next-mdx-remote/hydrate'
import { getPost } from 'lib/paths/posts'
import { components } from 'components/MDX/MDX'

export default function Post({ jsx, frontMatter }) {
  console.log(frontMatter)
  const post = hydrate(jsx, { components })
  return <article>{post}</article>
}

export const getStaticProps = async ( { params }) => {
  const renderToString = require('next-mdx-remote/render-to-string')
  const matter = require('gray-matter')
  const { mdxOptions } = require('lib/mdx')

  const { permalink } = params
  const postBuffer = getPost(permalink)
  const mdx = postBuffer.toString()
  const { content, data } = matter(mdx)
  const jsx = await renderToString(content, { components, mdxOptions })

  return {
    props: {
      frontMatter: data,
      jsx
    },
  }
}

export async function getStaticPaths() {
  const fs = require('fs')
  const path = require('path')

  // Directory of posts
  const postsDir = path.join(process.cwd(), 'posts')
  // Post filenames
  const postsFiles = fs.readdirSync(postsDir)
  // Static paths
  const paths = postsFiles.map((fileName: string) => ({
    params: {
      permalink: fileName.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  };
}
