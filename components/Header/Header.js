import cn from 'classnames'
import Link from 'next/link'

import { Flex } from 'components/Flex'

import styles from './Header.module.css'

export const Header = () => {
  const [scrolled, setScrolled] = React.useState(false)
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const monitorClientScroll = () => {
      const breakpoint = 20
      const { scrollY } = window
      if (scrollY > breakpoint && !scrolled) {
        setScrolled(true)
      }
      if (scrollY < breakpoint && scrolled) {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', monitorClientScroll)

    return () => {
      window.removeEventListener('scroll', monitorClientScroll)
    }
  }, [scrolled])

  return (
    <div
      className={cn('header', styles.header, {
        [styles.scrolled]: scrolled,
      })}
    >
      <Flex align="center" className="container" justify="between">
        <div>
          <Link href="/">
            <a className={styles.logo}>
              <img alt="SMHutch" src="/logo-dark.svg" />
            </a>
          </Link>
        </div>
        <nav>
          <Link href="/about">
            <a className="highlight">About</a>
          </Link>
        </nav>
        {/* <button
          aria-label={isMenuOpen ? 'open menu' : 'close menu'}
          className={cn('reset', styles.mobileToggle, {
            [styles.isMenuOpen]: isMenuOpen,
          })}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
        /> */}
      </Flex>
    </div>
  )
}
