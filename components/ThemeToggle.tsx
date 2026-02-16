import { useIsDarkMode, useToggleTheme } from 'hooks/theme'
import { css } from 'system/css'
import { useIsHydrated } from 'utils/hooks'

const MoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M22 17v2h-1v1h-1v1h-2v1h-2v1h-6v-1H8v-1H6v-1H5v-1H4v-2H3v-2H2V9h1V7h1V5h1V4h1V3h2V2h2V1h5v1h-2v1h-2v1h-1v2H9v2H8v4h1v2h1v2h1v1h2v1h2v1h4v-1h2v-1z"
      />
    </svg>
  )
}

const SunIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13 3h-2v2h2zm4 2h2v2h-2zm-6 6h2v2h-2zm-8 0h2v2H3zm18 0h-2v2h2zM5 5h2v2H5zm14 14h-2v-2h2zm-8 2h2v-2h-2zm-4-2H5v-2h2zM9 7h6v2H9zm0 8H7V9h2zm0 0v2h6v-2h2V9h-2v6z"
      />
    </svg>
  )
}

const SIZE = 6

const buttonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: SIZE,
  h: SIZE,
  borderRadius: 'sm',
  color: 'text.tertiary',
  cursor: 'pointer',
  transition: 'common',
  transitionDuration: 'common',

  _hover: {
    color: 'text.primary',
    transform: 'scale(1.4)',
  },
})

const placeholderStyles = css({
  display: 'inline-block',
  w: SIZE,
  h: SIZE,
})

export const ThemeToggle: React.FC = () => {
  const toggleTheme = useToggleTheme()
  const isDark = useIsDarkMode()
  const isHydrated = useIsHydrated()

  if (!isHydrated) {
    return <span className={placeholderStyles} />
  }

  return (
    <button
      aria-label="Toggle theme"
      className={buttonStyles}
      type="button"
      onClick={toggleTheme}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
