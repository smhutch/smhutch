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
        backgroundColor: 'pink.600',
        color: 'gray.50',
      },
      secondary: {
        backgroundColor: 'pink.100',
        color: 'pink.600',
      },
    },
  },
})
