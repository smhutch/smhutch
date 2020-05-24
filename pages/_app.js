import Router from 'next/router'

import { GlobalCSS } from 'components/CSS'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { MDX } from 'components/MDX'
import { GlobalMeta } from 'components/Meta'
import { GA_TRACKING_ID, trackPage } from 'lib/gtag'

Router.events.on('routeChangeComplete', (url) => {
  GA_TRACKING_ID && trackPage(url)
})

const App = ({ Component, pageProps, router }) => {
  const ui = <Component {...pageProps} />
  const page = Component.isMDXComponent ? <MDX>{ui}</MDX> : ui
  const isPupeteer = router.query.pupeteer

  return (
    <>
      <GlobalCSS />
      <GlobalMeta />
      <div className="app">
        {!isPupeteer && <Header />}
        <div className="page">{page}</div>
        {!isPupeteer && (
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
