import Document, { Html, Head, Main, NextScript } from 'next/document'

class I18nDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css?family=Inter:300,400,800&amp;display=swap"
            rel="stylesheet"
          />
        </head>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default I18nDocument
