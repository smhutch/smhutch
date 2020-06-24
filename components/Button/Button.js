import cn from 'classnames'

import styles from './Button.module.css'

export const Button = ({ className, variant = 'link', ...props }) => {
  return (
    <button
      className={cn('button', styles.button, className, {
        [styles.link]: variant === 'link',
      })}
      {...props}
    />
  )
}
