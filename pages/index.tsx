import { WEB_LINKS, WORK_LINKS } from 'constants/resources'
import { link } from 'css/link'
import { motion, useSpring } from 'motion/react'
import type { NextPage } from 'next'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import { useMouse, useRafLoop } from 'react-use'
import { css } from 'system/css'
import { Container } from 'system/jsx'
import { container, flex, stack } from 'system/patterns'
import { lerp } from 'utils/math'
import { STAGGER_FADE } from 'utils/motion'

import { Meta } from 'components/Meta'
import { useIsDarkMode } from 'hooks/theme'
import { doNothing } from 'remeda'
import type { ExternalLinkConfig } from 'types/content'

const GAP = 12
const SHOW_WEB_3 = false
const FOOTER_LINK_STAGGER_DELAY = 0.06

const Index: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const mouse = useMouse(canvasRef as React.RefObject<Element>)

  const xMovement = useSpring(0)
  const alpha = useSpring(0, { bounce: 0 })
  const isDarkMode = useIsDarkMode()

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

    ctx.globalAlpha = 1
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = isDarkMode ? 'black' : 'white'
    ctx.strokeStyle = isDarkMode ? 'white' : 'black'
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

  const footerSection1Delay = 0.6
  const footerSection2Delay =
    footerSection1Delay + (WORK_LINKS.length + 2) * FOOTER_LINK_STAGGER_DELAY

  return (
    <>
      <Meta description="Engineer." title="SMHutch" />
      <div
        className={flex({
          flexGrow: 1,
          position: 'relative',
          direction: 'column',
          minHeight: '40vh',
        })}
      >
        <div
          className={flex({
            zIndex: 1,
            height: '100%',
            mt: 'auto',
            backgroundColor: '{colors.white}/60',
            backdropFilter: 'blur(2px)',
            py: 10,
            borderTop: '1px solid',
            borderColor: 'border',
            transition: 'all',
            transitionDuration: 'common',
            overflow: 'hidden',

            _dark: {
              backgroundColor: '{colors.black}/60',
            },

            '& p': { fontWeight: 'light' },

            '& strong': {
              fontWeight: 'semibold',
              borderRadius: 'full',
              wordWrap: 'normal',
              display: 'inline-block',
            },
          })}
          onFocus={doNothing}
          onBlur={doNothing}
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
              <Tagline />
              {SHOW_WEB_3 && (
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
              )}
            </div>
          </div>
        </div>
        <motion.canvas
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ type: 'spring', duration: 2.8 }}
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
      <FooterLinkList heading="Work" startDelay={footerSection1Delay}>
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
      <FooterLinkList heading="Web" startDelay={footerSection2Delay}>
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

const AboutSection = (props: PropsWithChildren<{ startDelay: number }>) => {
  const { startDelay = 0 } = props

  return (
    <motion.section
      animate={STAGGER_FADE.animate}
      initial={STAGGER_FADE.initial}
      variants={STAGGER_FADE.variants.container}
      transition={{
        delayChildren: stagger(0.08, {
          from: 'first',
          startDelay: startDelay,
          ease: 'easeIn',
        }),
      }}
      className={css({
        pt: 8,
        pb: 16,
        borderTop: '1px solid',
        borderColor: 'border',
        transition: 'common',
        transitionDuration: 'common',
      })}
    >
      <Container>{props.children}</Container>
    </motion.section>
  )
}

const AboutSectionHeading = (props: PropsWithChildren) => {
  return (
    <motion.p
      className={css({
        color: 'text.tertiary',
        fontSize: 'small',
        fontWeight: 'light',
        mb: 6,
        transformOrigin: 'center left',
        flexGrow: 0,
        display: 'inline-block',
      })}
      variants={STAGGER_FADE.variants.item}
    >
      {props.children}
    </motion.p>
  )
}

const FooterLinkList = (
  props: PropsWithChildren<{
    heading: string
    startDelay?: number
  }>
) => {
  const { startDelay = 0 } = props

  return (
    <AboutSection startDelay={startDelay}>
      <AboutSectionHeading>{props.heading}</AboutSectionHeading>
      <motion.ul
        className={stack({
          gap: 3,
          align: 'flex-start',
        })}
      >
        {props.children}
      </motion.ul>
    </AboutSection>
  )
}

const ExternalFooterLinkListItem = (props: ExternalLinkConfig) => {
  return (
    <motion.li
      variants={STAGGER_FADE.variants.item}
      className={css({
        transformOrigin: 'center left',
      })}
    >
      <a
        className={link({ variant: 'underline' })}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.label}
      </a>
    </motion.li>
  )
}

const Tagline = () => {
  return (
    <motion.p
      className={css({
        maxWidth: '40ch',
        lineHeight: 'snug',
        fontSize: '3xl',
        transformOrigin: 'center left',
      })}
      initial={{
        opacity: 0,
        filter: 'blur(8px)',
        transform: 'translateY(80px)',
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translateY(0px) scale(1)',
      }}
      transition={{ type: 'spring', duration: 1.4 }}
    >
      Engineer who ships polished <motion.strong>user interfaces</motion.strong>
      , crafts <motion.strong>design systems</motion.strong>, and enjoys{' '}
      <motion.strong>creative coding</motion.strong>.
    </motion.p>
  )
}

export default Index
