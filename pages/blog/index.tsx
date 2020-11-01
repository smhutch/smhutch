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
                    <Text className="post-title mb2" el="h2" look="h3">
                      {post.title}
                    </Text>
                  </a>
                </Link>
                <Text className="mb1">{post.description}</Text>
                <Text className="mb4" color="offset" variant="mono">
                  <small>
                    {new Date(post.publishedOn).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </small>
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <style jsx>{`
        a :global(.post-title) {
          color: inherit;
        }

        span {
          display: block;
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
