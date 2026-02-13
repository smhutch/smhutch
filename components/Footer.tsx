import { hasAnimatedInIndex } from '@/atoms/animations'
import { useAtomValue } from 'jotai'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { css } from 'system/css'
import { Container } from 'system/jsx'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const initialPathname = useRef(pathname)
  const hasIndexAnimated = useAtomValue(hasAnimatedInIndex)
  const isVisible = initialPathname.current === '/' ? hasIndexAnimated : true

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
        <motion.p
          className={css({
            display: 'inline-block',
            fontSize: 'xs',
            color: 'text.tertiary',
            fontWeight: 'light',
            transformOrigin: 'left',
          })}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(4px)',
              transform: 'translateY(12px)',
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              transform: 'translateY(0px)',
            },
          }}
          transition={{
            duration: 0.6,
            type: 'spring',
          }}
        >
          SMHutch &#183; {currentYear}
        </motion.p>
      </Container>
    </footer>
  )
}
