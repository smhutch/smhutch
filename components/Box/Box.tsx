import cx from 'clsx'

import styles from './Box.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  el?: 'article' | 'div' | 'main' | 'section' | 'span'
}

export const Box: React.FC<Props> = ({
  el: Component = 'div',
  className = '',
  ...props
}) => {
  return <Component className={cx('box', styles.box, className)} {...props} />
}
