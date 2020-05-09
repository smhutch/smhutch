import cn from 'classnames'

import { Text } from 'components/Text'

import styles from './Footer.module.css'

const now = new Date()

export const Footer = () => {
  return (
    <footer className={cn('footer', styles.footer)}>
      <div className="container">
        <div className={cn(styles.content)}>
          <Text>&copy; {now.getFullYear()} &mdash; SMHutch</Text>
        </div>
      </div>
    </footer>
  )
}
