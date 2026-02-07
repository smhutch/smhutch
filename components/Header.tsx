import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cva } from 'system/css'
import { Container } from 'system/jsx'
import { flex } from 'system/patterns'
import type { StringRoute } from 'types/next'
import { useIsHydrated } from 'utils/hooks'

const LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/sketches', label: 'Generative' },
] as const satisfies Array<{ href: StringRoute; label: string }>

export const Header: React.FC = () => {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const isHydrated = useIsHydrated()

  return (
    <div
      className={css({
        w: '100%',
        background: 'surface.overlay',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderBottomColor: 'border.default',
        position: 'sticky',
        top: 0,
        zIndex: 2,
      })}
    >
      <Container>
        <div
          className={flex({
            align: 'center',
            justify: 'space-between',
          })}
        >
          <Link href="/">
            <img
              alt="SMHutch"
              className={css({ w: 5, h: 5 })}
              src={
                isHydrated && resolvedTheme === 'dark'
                  ? '/logo-light.svg'
                  : '/logo-dark.svg'
              }
            />
          </Link>
          <div className={flex({ align: 'center', gap: 0 })}>
            <ul className={flex({ gap: 0 })}>
              {LINKS.map((item) => {
                return (
                  <li key={item.label}>
                    <Link
                      className={headerLinkItem({
                        active: router.asPath.startsWith(item.href),
                      })}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            {isHydrated && (
              <button
                aria-label="Toggle theme"
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  w: 8,
                  h: 8,
                  ml: 1,
                  borderRadius: 'md',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  transition: 'color 0.3s, background 0.3s',
                  '&:hover': {
                    color: 'text.primary',
                    background: 'interactive.hover',
                  },
                })}
                type="button"
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
              >
                {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

const headerLinkItem = cva({
  base: {
    display: 'block',
    fontSize: 'small',
    py: 4,
    px: 3,
    position: 'relative',
    color: 'text.secondary',
    transition: 'color 0.4s ease',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 2,
      right: 2,
      height: '1px',
      transition: 'transform 0.4s ease',
      background: 'accent.line',
      transform: 'scaleX(0)',
    },

    '&:hover': {
      color: 'text.default',
    },

    '&:hover:after': {
      transform: 'scaleX(1)',
    },
  },
  variants: {
    active: {
      true: {
        color: 'text.primary',
        '&:after': {
          transform: 'scaleX(1)',
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
})
