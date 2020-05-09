import cn from 'classnames'
import { resolve } from 'styled-jsx/css'

import { Box } from 'components/Box'

export const Stack = ({ className, gap = 3, ...props }) => {
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
        className={cn('stack', className, stackStyles.className)}
        {...props}
      />
      {stackStyles.styles}
    </>
  )
}
