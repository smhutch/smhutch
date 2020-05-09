import cn from 'classnames'

import styles from './Box.module.css'

export const Box = ({ el: Component = 'div', className, ...props }) => {
  return <Component className={cn('box', styles.box, className)} {...props} />
}
