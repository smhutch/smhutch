import { useIsDarkMode } from 'hooks/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cva } from 'system/css'
import { Container } from 'system/jsx'
import { flex } from 'system/patterns'
import type { StringRoute } from 'types/next'
import { useIsHydrated } from 'utils/hooks'

const LINKS = [
  // { href: '/writing', label: 'Writing' },
  { href: '/sketches', label: 'Generative' },
] as const satisfies Array<{ href: StringRoute; label: string }>

export const Header: React.FC = () => {
  const router = useRouter()
  const isDark = useIsDarkMode()
  const isHydrated = useIsHydrated()

  return (
    <div
      className={css({
        w: '100%',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderBottomColor: 'border',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        background: 'white/80',

        transition: 'common',

        _dark: {
          background: 'neutral.950/90',
        },
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
              src={isHydrated && isDark ? '/logo-light.svg' : '/logo-dark.svg'}
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
      borderRadius: '2px',
      transition: 'common',
      transitionDuration: 'common',
      background: '{colors.black}',
      transform: 'scaleX(0.1)',
      opacity: 0,

      _dark: {
        background: '{colors.white}',
      },
    },

    '&:hover': {
      color: 'text',
    },

    '&:hover:after': {
      transform: 'scaleX(1)',
      opacity: 1,
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
