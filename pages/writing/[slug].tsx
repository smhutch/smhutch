import { DiscIcon } from '@radix-ui/react-icons'
import { type Post, allPosts } from 'contentlayer/generated'
import { DOT } from 'data/typography'
import { format, parseISO } from 'date-fns'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import type React from 'react'
import { css } from 'system/css'
import { Container, Divider, Flex } from 'system/jsx'

import { MDX_COMPONENTS } from 'components/Mdx'

type PageParams = { slug: string }
type PageProps = { post: Post }

const Article: React.FC<PageProps> = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const { post } = props
  const Mdx = useMDXComponent(post.body.code)
  const postDate = parseISO(post.date)

  return (
    <div>
      <Container maxW="70ch" mb="10vh" mt={12}>
        <h1
          className={css({
            fontSize: '6xl',
            fontWeight: 'semibold',
            letterSpacing: 'tight',
          })}
        >
          {post.title}
        </h1>
        <h2
          className={css({
            fontSize: 'xl',
            mb: 24,
            color: 'gray.600',
            fontWeight: 'light',
          })}
        >
          {post.subtitle}
        </h2>
        <Flex
          align="center"
          className={css({
            '& svg': {
              width: '12px',
              height: '12px',
            },
          })}
          fontSize="xs"
          gap={2}
        >
          <DiscIcon />
          <p className={css({ color: 'gray.600' })}>{post.readingTime}</p>
          <span className={css({ color: 'gray.400' })}>{DOT}</span>
          <p className={css({ color: 'gray.600' })}>
            {format(postDate, 'do MMM, Y')}
          </p>
        </Flex>
        <Divider color="gray.200" mb={8} mt={4} />
        <Mdx components={MDX_COMPONENTS} />
      </Container>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<PageParams> = async (_ctx) => {
  return {
    paths: allPosts.map((post) => {
      const slug = post._raw.sourceFileName.replace('.mdx', '')

      return {
        params: { slug },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params) throw new Error('No params')
  if (!params.slug) throw new Error('No slug param')

  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return {
    props: {
      post,
    },
  }
}

export default Article
