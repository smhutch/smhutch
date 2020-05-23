import Head from 'next/head'

import { absolutePath } from 'lib/assets'

export const Meta = ({ description, image, title = 'SMHutch' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={title} property="og:title" />

      {/* Description */}
      {description && (
        <>
          <meta content={description} name="description" />
          <meta content={description} name="og:description" />
        </>
      )}

      {/* Images */}
      {image && <meta content={absolutePath(image)} property="og:image" />}
    </Head>
  )
}
