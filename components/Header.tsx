import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cva } from 'system/css'
import { Container } from 'system/jsx'
import { flex } from 'system/patterns'
import type { StringRoute } from 'types/next'

const LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/sketches', label: 'Generative' },
] as const satisfies Array<{ href: StringRoute; label: string }>

export const Header: React.FC = () => {
  const router = useRouter()

  return (
    <div
      className={css({
        w: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderBottomColor: 'gray.200',
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
              src="/logo-dark.svg"
            />
          </Link>
          <div>
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
    color: 'gray.600',
    transition: 'color 0.4s ease',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 2,
      right: 2,
      height: '1px',
      transition: 'transform 0.4s ease',
      background: 'black',
      transform: 'scaleX(0)',
    },

    '&:hover': {
      color: 'gray.800',
    },

    '&:hover:after': {
      transform: 'scaleX(1)',
    },
  },
  variants: {
    active: {
      true: {
        color: 'gray.950',
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
