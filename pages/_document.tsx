import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
