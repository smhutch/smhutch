import Head from 'next/head'

import { Article } from 'components/Article'
import { Meta } from 'components/Meta'
import { Text } from 'components/Text'
import type { BlogSettings } from 'types/blog'

export const Post: React.FC<BlogSettings> = ({
  id,
  description,
  title,
  children,
  publishedOn,
}) => {
  const publishedDate = new Date(publishedOn)
  const image = `blog/${id}.png`

  const ldJsonHtml = `
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${process.env.SITE_URL}"
  },
  "headline": "${title}",
  "description": "${description}",
  "author": {
    "@type": "Person",
    "name": "Scott M. Hutcheson"
  },
  "image": {
  	"@type": "ImageObject",
  	"url": "${process.env.SITE_URL}/${image}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SMHutch",
    "logo": {
      "@type": "ImageObject",
      "url": "${process.env.SITE_URL}/logo-light.svg"
    }
  },
  "datePublished": "${[
    publishedDate.getFullYear(),
    publishedDate.getMonth() + 1,
    publishedDate.getDate(),
  ].join('-')}"
}`

  return (
    <>
      <Meta description={description} image={image} title={title} />
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: ldJsonHtml }}
          type="application/ld+json"
        />
      </Head>
      <Article>
        <Text el="h1">{title}</Text>
        <Text variant="mono">
          <small>
            &#8227;{' '}
            {publishedDate.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </small>
        </Text>
        {children}
      </Article>
    </>
  )
}
