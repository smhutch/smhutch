import cx from 'clsx'

import styles from './Button.module.css'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  // TODO: add additional variants
  variant: 'link'
}

export const Button: React.FC<Props> = ({
  className = '',
  variant = 'link',
  ...props
}) => {
  return (
    <button
      className={cx('button', styles.button, className, {
        [styles.link]: variant === 'link',
      })}
      {...props}
    />
  )
}
