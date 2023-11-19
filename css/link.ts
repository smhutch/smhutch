import { cva } from 'system/css'

export const link = cva({
  base: {
    display: 'inline-block',
    position: 'relative',
    transition: '0.3s ease all',
    color: 'gray.900',
  },
  variants: {
    variant: {
      underline: {
        '&:hover': {
          color: 'pink.600',
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
          background: 'gray.300',
          transition: '0.2s ease transform',
          transform: 'scaleX(0.98) translateY(1px)',
        },

        '&:hover:after': {
          background: 'pink.200',
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
          background: 'pink.100',
          //   transform: 'scaleX(0.94) translateY(2px)',
        },
      },
    },
  },
})
