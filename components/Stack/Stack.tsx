import cx from 'clsx'
import { resolve } from 'styled-jsx/css'

import { Box } from 'components/Box'
import { SpaceLookup } from 'types/theme'

interface Props extends React.ComponentProps<typeof Box> {
  gap?: SpaceLookup
}

export const Stack: React.FC<Props> = ({ className, gap = 3, ...props }) => {
  const stackStyles = resolve`
    .stack :global(> *) {
      margin-bottom: var(--space-${gap});
    }
    
    .stack :global(> *:last-child) {
      margin-bottom: 0;
    }
  `

  return (
    <>
      <Box
        className={cx('stack', className, stackStyles.className)}
        {...props}
      />
      {stackStyles.styles}
    </>
  )
}
