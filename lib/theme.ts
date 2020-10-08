import { FontScale, SpaceScale } from 'types/theme'

import { toPx, toRem } from './styles'

const fontScale: FontScale = [0, 0.75, 1, 1.25, 1.5, 2, 2.25]

export const fontSizes = {
  base: '16px',
  scale: fontScale.map(toRem),
}

const spaceScale: SpaceScale = [0, 4, 8, 16, 32, 64, 128]

export const space = spaceScale.map(toPx)
