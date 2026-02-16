import { ThemeToggle } from 'components/ThemeToggle'
import { css } from 'system/css'
import { Container } from 'system/jsx'
import { flex } from 'system/patterns'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={css({
        borderTop: '1px solid',
        borderColor: 'border',
        position: 'relative',
        overflow: 'hidden',
        transition: 'common',
        transitionDuration: 'common',
      })}
    >
      <Container py={6}>
        <div className={flex({ align: 'center', justify: 'space-between' })}>
          <p
            className={css({
              fontSize: 'xs',
              color: 'text.tertiary',
              fontWeight: 'light',
            })}
          >
            SMHutch &#183; {currentYear}
          </p>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  )
}
