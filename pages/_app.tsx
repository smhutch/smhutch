import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import Router from 'next/router'

import { Article } from 'components/Article'
import { GlobalCSS } from 'components/CSS'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { GlobalMeta } from 'components/Meta'
import { GA_TRACKING_ID, trackPage } from 'lib/gtag'

Router.events.on('routeChangeComplete', (url) => {
  GA_TRACKING_ID && trackPage(url)
})

const isPuppeteer = process.env.IS_PUPPETEER

interface Props extends AppProps {
  // MDX adds isMDXComponent as a static property to pages written in .mdx
  Component: NextComponentType & { isMDXComponent?: boolean }
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const ui = <Component {...pageProps} />
  const page = Component.isMDXComponent ? <Article>{ui}</Article> : ui

  return (
    <>
      <GlobalCSS />
      <GlobalMeta />
      <div className="app">
        {!isPuppeteer && <Header />}
        <div className="page">{page}</div>
        {!isPuppeteer && (
          <div className="footer">
            <Footer />
          </div>
        )}
      </div>
      <style jsx>{`
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .footer {
          margin-top: auto;
        }
      `}</style>
    </>
  )
}

export default App
