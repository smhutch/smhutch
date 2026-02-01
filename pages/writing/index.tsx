import { format, parseISO } from 'date-fns'
import { type PostMeta, getAllPosts } from 'lib/content'
import type { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { getRoute } from 'next-type-safe-routes'
import Link from 'next/link'
import type React from 'react'
import { css } from 'system/css'
import { Container } from 'system/jsx'

type PageProps = { posts: PostMeta[] }

const postLinkStyles = css({
  display: 'block',
  marginBottom: 4,
  px: 4,
  py: 3,
  mx: -4,
  borderRadius: 'lg',
  transition: 'background 0.4s ease',

  '&:hover': { background: 'gray.100' },
})

const Writing: React.FC<PageProps> = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  return (
    <div>
      <Container mt={8}>
        <h1
          className={css({
            mb: 12,
            fontWeight: 'semibold',
            fontSize: '5xl',
            letterSpacing: 'tight',
          })}
        >
          Writing
        </h1>
        <ul className={css({ maxWidth: '400px' })}>
          {props.posts.map((post) => {
            const postDate = parseISO(post.date)

            return (
              <li key={post.slug}>
                <Link
                  className={postLinkStyles}
                  href={getRoute({
                    route: '/writing/[slug]',
                    params: { slug: post.slug },
                  })}
                >
                  <h2
                    className={css({
                      fontSize: 'lg',
                      fontWeight: 'semibold',
                      mb: 1,
                    })}
                  >
                    {post.title}
                  </h2>
                  <p className={css({ color: 'gray.600', mb: 1 })}>
                    {post.subtitle}
                  </p>
                  <div className={css({ color: 'gray.600', fontSize: 'xs' })}>
                    {format(postDate, 'do MMM, Y')}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts().sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return {
    props: {
      posts,
    },
  }
}

export default Writing
