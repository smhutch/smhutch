import { useIsDarkMode } from 'hooks/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cva, cx } from 'system/css'
import { Container } from 'system/jsx'
import type { StringRoute } from 'types/next'
import { useIsHydrated } from 'utils/hooks'

const _LINKS = [
  // { href: '/writing', label: 'Writing' },
  // { href: '/sketches', label: 'Generative' },
] as const satisfies Array<{ href: StringRoute; label: string }>

export const Header: React.FC = () => {
  const _router = useRouter()
  const isDark = useIsDarkMode()
  const isHydrated = useIsHydrated()

  return (
    <div
      className={css({
        w: '100%',
        // backdropFilter: 'blur(2px)',
        // borderBottom: '1px solid',
        // borderBottomColor: 'border',
        position: 'absolute',
        top: 4,
        zIndex: 2,
        // background: 'white/80',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',

        transition: 'common',

        _dark: {
          // background: 'neutral.950/80',
        },
      })}
    >
      <Container>
        <div>
          <Link
            href="/"
            className={cx(
              'group',
              css({
                display: 'inline-block',
                alignItems: 'center',
                padding: 3,
                flexShrink: 0,
                flexGrow: 0,
                marginLeft: -3,
                backdropFilter: 'blur(10px)',
                borderRadius: 'full',
                backgroundColor: 'white/80',
                border: '1px solid',
                borderColor: 'border',
                transition: 'common',
                transitionDuration: 'common',

                _hover: {
                  transformOrigin: 'center',
                  transform: 'scale(1.6) rotate(6deg)',
                },

                _dark: {
                  backgroundColor: 'neutral.950/20',
                },
              })
            )}
          >
            <img
              alt="SMHutch"
              className={css({
                display: 'block',
                w: 5,
                h: 5,
                transition: 'common',
                transitionDuration: 'common',
                _groupHover: {
                  transformOrigin: 'center',
                  transform: 'scale(0.8)',
                },
              })}
              src={isHydrated && isDark ? '/logo-light.svg' : '/logo-dark.svg'}
            />
          </Link>
          {/* <div className={flex({ align: 'center', gap: 0 })}>
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
          </div> */}
        </div>
      </Container>
    </div>
  )
}

const _headerLinkItem = cva({
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
