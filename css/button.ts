import { cva } from 'system/css'

export const button = cva({
  base: {
    py: 2,
    px: 4,
    borderRadius: 'full',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'accent.primary',
        color: 'gray.50',
      },
      secondary: {
        backgroundColor: 'accent.primary.subtle',
        color: 'accent.primary',
      },
    },
  },
})
