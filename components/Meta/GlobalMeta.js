import Head from 'next/head'

export const GlobalMeta = () => {
  const icon = (name) => `/favicons/${name}`

  return (
    <Head>
      <link href={icon('32.png')} rel="icon" sizes="32x32" type="image/png" />
      <link href={icon('16.png')} rel="icon" sizes="16x16" type="image/png" />
      <link href={icon('favicon.ico')} rel="shortcut icon" />
    </Head>
  )
}
