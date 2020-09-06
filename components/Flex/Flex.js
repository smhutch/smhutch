import cx from 'clsx'
import { resolve } from 'styled-jsx/css'

import styles from './Flex.module.css'

export const Flex = ({
  align,
  className,
  el: El = 'div',
  gap = 3,
  justify,
  ...props
}) => {
  const flexStyles = resolve`
    .flex :global(> *:not(:last-child)) {
      margin-right: var(--space-${gap});
    }
  `

  return (
    <>
      <El
        {...props}
        className={cx('flex', styles.flex, className, flexStyles.className, {
          // Justify
          [styles.jb]: justify === 'between',
          [styles.ac]: align === 'center',
        })}
      />
      {flexStyles.styles}
    </>
  )
}
