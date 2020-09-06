import cx from 'clsx'

import styles from './Button.module.css'

export const Button = ({ className, variant = 'link', ...props }) => {
  return (
    <button
      className={cx('button', styles.button, className, {
        [styles.link]: variant === 'link',
      })}
      {...props}
    />
  )
}
