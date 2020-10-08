import cx from 'clsx'
import { resolve } from 'styled-jsx/css'
import { SpaceLookup } from 'types/theme'

import styles from './Flex.module.css'

interface Props extends React.HTMLAttributes<HTMLElement> {
  // TODO: add more when needed
  align?: 'center'
  // TODO: add more when needed
  justify?: 'between'
  el?: 'div' | 'section' | 'span'
  gap?: SpaceLookup
}

export const Flex: React.FC<Props> = ({
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
