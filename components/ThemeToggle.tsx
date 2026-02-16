import { useIsDarkMode, useToggleTheme } from 'hooks/theme'
import { css } from 'system/css'
import { useIsHydrated } from 'utils/hooks'

const MoonIcon = () => (
  <svg
    fill="currentColor"
    height="15"
    viewBox="0 0 15 15"
    width="15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Dark mode</title>
    <path d="M5 3A4.5 4.5 0 1 1 5 12A5.5 5.5 0 0 0 5 3Z" />
  </svg>
)

const SunIcon = () => (
  <svg
    height="15"
    viewBox="0 0 15 15"
    width="15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Light mode</title>
    <circle cx="7.5" cy="7.5" fill="currentColor" r="2.75" />
    <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.2">
      <line x1="7.5" x2="7.5" y1="0.75" y2="3" />
      <line x1="7.5" x2="7.5" y1="12" y2="14.25" />
      <line x1="0.75" x2="3" y1="7.5" y2="7.5" />
      <line x1="12" x2="14.25" y1="7.5" y2="7.5" />
      <line x1="2.72" x2="4.31" y1="2.72" y2="4.31" />
      <line x1="10.69" x2="12.28" y1="10.69" y2="12.28" />
      <line x1="2.72" x2="4.31" y1="12.28" y2="10.69" />
      <line x1="10.69" x2="12.28" y1="4.31" y2="2.72" />
    </g>
  </svg>
)

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
  transition: 'color 0.2s',
  '&:hover': {
    color: 'text.secondary',
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
