import { cva } from 'system/css'

export const link = cva({
  base: {
    display: 'inline-block',
    position: 'relative',
    transition: '0.3s ease color, 0.2s ease transform',
    color: 'text.primary',
  },
  defaultVariants: {
    variant: 'underline',
  },
  variants: {
    variant: {
      underline: {
        '&:hover': {
          color: 'accent.primary',
          transform: 'translateY(-1px)',
        },

        '&:after': {
          content: '""',
          height: '1px',
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          background: 'border',
          borderRadius: 'full',
          transition: '0.2s ease transform, 0.2s ease background',
          transform: 'scaleX(0.98) translateY(1px)',
          zIndex: -1,
        },

        '&:hover:after': {
          background: 'accent.hover',
          transform: 'scaleX(0.92) translateY(1px)',
        },
      },
    },
  },
})
