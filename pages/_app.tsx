import '../css/global.css'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { css } from 'system/css'
import { flex } from 'system/patterns'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { GlobalMeta } from 'components/Meta'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalMeta />
      <VercelAnalytics />
      <div
        className={flex({
          direction: 'column',
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
        })}
      >
        <Header />
        <Component {...pageProps} />
        <div className={css({ marginTop: 'auto' })}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
