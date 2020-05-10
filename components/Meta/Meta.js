import Head from 'next/head'

export const Meta = ({ description, title = 'SMHutch' }) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta content={description} name="description" />}
    </Head>
  )
}
