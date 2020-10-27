import Head from 'next/head'

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
  return (
    <Head>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <meta content={title} name="twitter:title"></meta>
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
    </Head>
  )
}
