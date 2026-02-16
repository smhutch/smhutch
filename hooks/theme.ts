import { DARK_THEME_KEY, LIGHT_THEME_KEY } from 'constants/themes'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export const useThemeName = () => {
  const { resolvedTheme } = useTheme()
  return resolvedTheme
}

export const useIsDarkMode = () => {
  const themeName = useThemeName()
  return themeName === DARK_THEME_KEY
}

export const useToggleTheme = () => {
  const { setTheme } = useTheme()

  const toggle = useCallback(() => {
    return setTheme((current) => {
      return current === LIGHT_THEME_KEY ? DARK_THEME_KEY : LIGHT_THEME_KEY
    })
  }, [setTheme])

  return toggle
}
