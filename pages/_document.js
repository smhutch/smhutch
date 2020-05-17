import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from 'lib/gtag'

class I18nDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Inter:wght@400;800"
            rel="stylesheet"
          />
          {GA_TRACKING_ID && (
            <>
              <script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                async
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || []
                  function gtag(){dataLayer.push(arguments)}
                  gtag('js', new Date())
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                      })
                `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default I18nDocument
