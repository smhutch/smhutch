import '../css/global.css'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { css } from 'system/css'
import { flex } from 'system/patterns'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { GlobalMeta } from 'components/Meta'

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const isMetaRoute = router.asPath.startsWith('/sketches/meta')

  const hasHeader = !isMetaRoute
  const hasFooter = !isMetaRoute

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
        {hasHeader && <Header />}
        <Component {...pageProps} />
        {hasFooter && (
          <div className={css({ marginTop: 'auto' })}>
            <Footer />
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
