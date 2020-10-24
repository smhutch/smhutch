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
  image,
  title = 'SMHutch',
}) => {
  const { asPath } = useRouter()
  const path = asPath.split('?')[0] // strip query string
  const url = `https://smhutch.dev${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      {description && (
        <>
          <meta content={description} name="description" />
          <meta content={description} name="og:description" />
        </>
      )}
      {image && <meta content={absolutePath(image)} property="og:image" />}
      <link href={url} rel="canonical" />
    </Head>
  )
}
