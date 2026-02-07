import { cva } from 'system/css'

export const link = cva({
  base: {
    display: 'inline-block',
    position: 'relative',
    transition: '0.3s ease all',
    color: 'text.primary',
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
          borderRadius: 'full',
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          background: 'border.decorative',
          transition: '0.2s ease transform',
          transform: 'scaleX(0.98) translateY(1px)',
        },

        '&:hover:after': {
          background: 'accent.hover',
          transform: 'scaleX(0.94) translateY(2px)',
        },
      },
      shape: {
        '&:after': {
          content: '""',
          top: -1,
          bottom: -1,
          left: -2,
          right: -2,
          zIndex: -1,
          borderRadius: 'lg',
          position: 'absolute',
          background: 'red',
          transition: '0.2s ease transform, 0.4s ease background',
        },

        '&:hover:after': {
          background: 'accent.primary.subtle',
          //   transform: 'scaleX(0.94) translateY(2px)',
        },
      },
    },
  },
})
