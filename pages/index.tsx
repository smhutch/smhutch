import { lerp } from 'canvas-sketch-util/math'
import { link } from 'css/link'
import { WEB_LINKS, WORK_LINKS } from 'contstants/resources'
import { motion, useSpring } from 'motion/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useMouse, useRafLoop } from 'react-use'
import { css } from 'system/css'
import { Container } from 'system/jsx'
import { container, flex, stack } from 'system/patterns'
import { noop } from 'utils/helpers'
import { STAGGER_FADE } from 'utils/motion'

import { Meta } from 'components/Meta'

const GAP = 12

const Index: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const mouse = useMouse(canvasRef)

  const xMovement = useSpring(0)
  const alpha = useSpring(0, { bounce: 0 })

  useRafLoop(() => {
    if (!canvasRef.current) return
    if (!ctxRef.current) return
    const canvas = canvasRef.current
    const ctx = ctxRef.current

    const { height, width } = canvas.getBoundingClientRect()

    const SCALE = window.devicePixelRatio

    canvas.width = width * SCALE
    canvas.height = height * SCALE

    ctx.scale(SCALE, SCALE)

    ctx.globalAlpha = 0.2
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = 'black'
    ctx.lineCap = 'round'

    const colCount = Math.floor(width / GAP)

    const mouseRangeWidth = width * 0.15
    const mouseRangeMin = mouse.elX - mouseRangeWidth
    const mouseRangeMax = mouse.elX + mouseRangeWidth

    for (let col = 0; col < colCount; col++) {
      // Percentage through columns
      const p = col / (colCount - 1)
      const centerDiff = Math.abs((p - 0.5) * 2)
      const centerP = lerp(1, 0, centerDiff)
      const x = lerp(-1, width + 1, p)

      const xWeight =
        x > mouseRangeMin && x < mouseRangeMax
          ? lerp(1, 0, Math.abs(x - mouse.elX) / mouseRangeWidth)
          : 0

      const xMovementWeight = lerp(-0.15, 0.15, xMovement.get())
      const xMovementAmount = width * xMovementWeight

      const mouseAlpha = lerp(0.1, 0.8, xWeight)

      ctx.globalAlpha = mouseAlpha * alpha.get()
      ctx.lineWidth = lerp(0.4, 1, xWeight)

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, 0)

      ctx.bezierCurveTo(
        lerp(x, x + xMovementAmount, centerP),
        height * 0.33,
        lerp(x, x - xMovementAmount, centerP),
        height * 0.66,
        x,
        height
      )
      ctx.stroke()
      ctx.restore()
    }
  })

  useEffect(() => {
    alpha.set(1)
  }, [])

  return (
    <>
      <Meta description="Engineer." title="SMHutch" />
      <div
        className={flex({
          flexGrow: 1,
          position: 'relative',
          direction: 'column',
          minHeight: '70vh',
        })}
      >
        <div
          className={flex({
            zIndex: 1,
            height: '100%',
            mt: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(4px)',
            py: 10,
            borderTop: '1px solid',
            borderColor: 'gray.200',
            transition: '0.4s ease backgroundColor',

            '& p': { fontWeight: 'light' },

            '& strong': {
              fontWeight: 'semibold',
              borderRadius: 'full',
              wordWrap: 'normal',
              display: 'inline-block',
            },
          })}
          onBlur={noop}
          onFocus={noop}
          onMouseOut={() => xMovement.set(0)}
          onMouseOver={() => xMovement.set(1)}
        >
          <div
            className={container({
              display: 'flex',
              flexDirection: 'column',
            })}
          >
            <div
              className={css({
                width: '100%',
                maxWidth: 1200,
                margin: '0 auto',
              })}
            >
              <motion.p
                animate={STAGGER_FADE.animate}
                className={css({
                  maxWidth: '40ch',
                  lineHeight: 'snug',
                  fontSize: '3xl',
                })}
                initial={STAGGER_FADE.initial}
                variants={STAGGER_FADE.variants.container}
              >
                Engineer who ships polished{' '}
                <motion.strong>user interfaces</motion.strong>, crafts{' '}
                <motion.strong>design systems</motion.strong>, and enjoys{' '}
                <motion.strong>creative coding</motion.strong>.
              </motion.p>
              <motion.p
                animate={STAGGER_FADE.animate}
                className={css({
                  lineHeight: 'snug',
                  width: 'fit-content',
                  fontSize: 'xl',
                  mt: 4,
                  color: 'gray.800',
                })}
                initial={STAGGER_FADE.initial}
                variants={STAGGER_FADE.variants.item}
              >
                Working in web3.
              </motion.p>
            </div>
          </div>
        </div>
        <canvas
          ref={(canvas) => {
            if (!canvas) return
            canvasRef.current = canvas
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctxRef.current = ctx
          }}
          className={css({
            display: 'block',
            width: '100%',
            height: '100%',
            transition: '0.4s ease opacity',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
          })}
        />
      </div>
      <FooterLinkList heading="Work">
        {WORK_LINKS.map((item) => {
          return (
            <ExternalFooterLinkListItem
              key={item.href}
              href={item.href}
              label={item.label}
            />
          )
        })}
      </FooterLinkList>
      <FooterLinkList heading="Web">
        {WEB_LINKS.map((item) => {
          return (
            <ExternalFooterLinkListItem
              key={item.href}
              href={item.href}
              label={item.label}
            />
          )
        })}
      </FooterLinkList>
    </>
  )
}

const AboutSection: React.FC = (props) => {
  return (
    <motion.section
      animate={STAGGER_FADE.animate}
      className={css({
        py: 8,
        borderTop: '1px solid',
        borderColor: 'gray.200',
        background: 'white',
      })}
      initial={STAGGER_FADE.initial}
      variants={STAGGER_FADE.variants.container}
    >
      <Container>{props.children}</Container>
    </motion.section>
  )
}

const AboutSectionHeading: React.FC = (props) => {
  return (
    <motion.p
      className={css({
        color: 'gray.400',
        fontSize: 'small',
        fontWeight: 'light',
        mb: 6,
      })}
      variants={STAGGER_FADE.variants.item}
    >
      {props.children}
    </motion.p>
  )
}

const FooterLinkList = (props: {
  children: React.ReactNode
  heading: string
}) => {
  return (
    <AboutSection>
      <AboutSectionHeading>{props.heading}</AboutSectionHeading>
      <motion.ul
        className={stack({
          gap: 2,
          alignItems: 'flex-start',
        })}
      >
        {props.children}
      </motion.ul>
    </AboutSection>
  )
}

const ExternalFooterLinkListItem = (props: { label: string; href: string }) => {
  return (
    <motion.li variants={STAGGER_FADE.variants.item}>
      <Link
        className={link({ variant: 'underline' })}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.label}
      </Link>
    </motion.li>
  )
}

export default Index
