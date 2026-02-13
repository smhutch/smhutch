import { css } from 'system/css'
import { Container } from 'system/jsx'

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
        <p
          className={css({
            fontSize: 'xs',
            color: 'text.tertiary',
            fontWeight: 'light',
          })}
        >
          SMHutch &#183; {currentYear}
        </p>
      </Container>
    </footer>
  )
}
