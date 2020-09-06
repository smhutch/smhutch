import cx from 'clsx'

import styles from './Box.module.css'

export const Box = ({ el: Component = 'div', className, ...props }) => {
  return <Component className={cx('box', styles.box, className)} {...props} />
}
