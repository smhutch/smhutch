import { ArrowUpIcon, DotFilledIcon, DotIcon } from '@radix-ui/react-icons'
import { lerp } from 'canvas-sketch-util/math'
import { motion, useSpring } from 'framer-motion'
import { useIsHydrated } from 'hooks/use-is-hydrated'
import { useEffect, useRef } from 'react'
import { css } from 'system/css'
import { Box, Container, Flex } from 'system/jsx'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={css({
        borderTop: '1px solid',
        borderColor: 'gray.200',
        backgroundColor: 'gray.50',
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
