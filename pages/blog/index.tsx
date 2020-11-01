import { getBlogIndex } from 'build/blog'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Meta } from 'components/Meta'
import { Text } from 'components/Text'
import type { BlogPreview } from 'types/blog'

interface Props {
  posts: BlogPreview[]
}

const Blog: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Meta title="Blog" />
      <main>
        <div className="container py4">
          <Text className="mb4" el="h1">
            Posts
          </Text>
          <ul className="reset">
            {posts.map((post) => (
              <li key={post.permalink}>
                <Link href={`/blog/${post.permalink}`}>
                  <a>
                    <Text className="post-title mb3" el="h2" look="h3">
                      {post.title}
                    </Text>
                  </a>
                </Link>
                <span className="mb2">{post.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <style jsx>{`
        a :global(.post-title) {
          color: unset;
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: await getBlogIndex(),
    },
  }
}

export default Blog
