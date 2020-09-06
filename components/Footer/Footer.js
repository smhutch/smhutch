import cx from 'clsx'

import { Text } from 'components/Text'

import styles from './Footer.module.css'

const now = new Date()

export const Footer = () => {
  return (
    <footer className={cx('footer', styles.footer)}>
      <div className="container">
        <div className={cx(styles.content)}>
          <Text>&copy; {now.getFullYear()} &mdash; SMHutch</Text>
        </div>
      </div>
    </footer>
  )
}
