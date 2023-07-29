import cx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Flex } from 'components/Flex'

import styles from './Header.module.css'

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
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
      className={cx('header', styles.header, {
        [styles.scrolled]: scrolled,
      })}
    >
      <Flex align="center" className="container" justify="between">
        <div>
          <Link href="/" legacyBehavior>
            <a className={styles.logo}>
              <img alt="SMHutch" src="/logo-dark.svg" />
            </a>
          </Link>
        </div>
        <nav>
          <Link href="/about" legacyBehavior>
            <a className="mr4">About</a>
          </Link>
          <Link href="/sketches" legacyBehavior>
            <a className="mr4">Sketches</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a>Blog</a>
          </Link>
        </nav>
      </Flex>
    </div>
  )
}
