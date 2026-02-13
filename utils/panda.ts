import { mapValues } from 'remeda'
import type { ThemeColors } from 'types/theme'

export const mapColorTokensToPandaConfig = (tokens: ThemeColors) => {
  return mapValues(tokens, (value) => {
    return {
      value,
    }
  })
}
