import { toPx, toRem } from './styles'

export const fontSizes = {
  base: '16px',
  scale: [0, 0.75, 1, 1.25, 1.5, 2, 2.25].map(toRem),
}

export const space = [0, 4, 8, 16, 32, 64, 128].map(toPx)
