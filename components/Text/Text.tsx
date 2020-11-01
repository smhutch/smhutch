import cx from 'clsx'

import styles from './Text.module.css'
import type { Tag } from './types'

type DomEl = HTMLParagraphElement | HTMLHeadingElement

interface Props extends React.HTMLAttributes<DomEl> {
  color?: 'dark' | 'offset'
  el?: Tag
  look?: Tag
  variant?: 'upper' | 'mono'
  inline?: boolean
}

export const Text: React.FC<Props> = ({
  el: Component = 'p',
  color = 'dark',
  className = '',
  look,
  variant,
  inline,
  ...props
}) => {
  const looksLike = look ? look : Component
  return (
    <Component
      className={cx('text', styles.text, className, {
        [styles.h1]: looksLike === 'h1',
        [styles.h2]: looksLike === 'h2',
        [styles.h3]: looksLike === 'h3',
        [styles.h4]: looksLike === 'h4',
        [styles.h5]: looksLike === 'h5',
        [styles.h6]: looksLike === 'h6',
        [styles.p]: looksLike === 'p',
        [styles.upper]: variant === 'upper',
        [styles.mono]: variant === 'mono',
        [styles.inline]: inline,
        [styles.offset]: color === 'offset',
      })}
      {...props}
    />
  )
}
