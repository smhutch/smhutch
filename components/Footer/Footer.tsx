import cx from 'clsx'

import { Flex } from 'components/Flex'
import { Text } from 'components/Text'

import styles from './Footer.module.css'

const now = new Date()

interface IconAnchorProps {
  alt: string
  href: string
  iconSrc: string
}

const IconAnchor: React.FC<IconAnchorProps> = ({ alt, href, iconSrc }) => {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      <img alt={alt} className={cx(styles.icon)} src={iconSrc} />
    </a>
  )
}

export const Footer: React.FC = () => {
  return (
    <footer className={cx('footer', styles.footer)}>
      <div className="container">
        <Flex className={cx(styles.content)} justify="between">
          <Text>&copy; {now.getFullYear()} &mdash; SMHutch</Text>
          <Flex gap={4}>
            <IconAnchor
              alt="GitHub"
              href="https://github.com/smhutch"
              iconSrc="/icons/GitHub.svg"
            />
            <IconAnchor
              alt="LinkedIn"
              href="https://www.linkedin.com/in/smhutch"
              iconSrc="/icons/LinkedIn.svg"
            />
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}
