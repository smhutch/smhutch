import { css } from 'system/css'
import { Container } from 'system/jsx'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={css({
        borderTop: '1px solid',
        borderColor: 'gray.200',
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <Container py={6}>
        <p
          className={css({
            fontSize: 'xs',
            color: 'gray.500',
            fontWeight: 'light',
          })}
        >
          SMHutch &#183; {currentYear}
        </p>
      </Container>
    </footer>
  )
}
