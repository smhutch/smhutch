import Head from 'next/head'

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
    </Head>
  )
}
