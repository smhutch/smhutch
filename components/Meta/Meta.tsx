import Head from 'next/head'
import { useRouter } from 'next/router'

import { absolutePath } from 'lib/assets'

interface Props {
  description?: string
  image?: string
  title?: string
}

export const Meta: React.FC<Props> = ({
  description,
  image = 'og.png',
  title = 'SMHutch',
}) => {
  const { asPath } = useRouter()
  const path = asPath.split('?')[0] // strip query string
  const url = `https://smhutch.dev${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <meta content={title} name="twitter:title" />
      {description && (
        <>
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content={description} name="twitter:description" />
        </>
      )}
      {image && (
        <>
          <meta content={absolutePath(image)} property="og:image" />
          <meta content={absolutePath(image)} name="twitter:image" />
          <meta content="summary_large_image" name="twitter:card" />
        </>
      )}
      <link href={url} rel="canonical" />
    </Head>
  )
}
