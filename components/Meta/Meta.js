import Head from 'next/head'

export const Meta = ({
  description = 'JavaScript Engineer at Sticker Mule.',
  title = 'SMHutch',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
    </Head>
  )
}
