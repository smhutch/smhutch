import type { Hsl } from './design'

export type ThemeColorKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type ThemeColors = Record<ThemeColorKey, Hsl>

export type Theme = {
  colors: ThemeColors
}
