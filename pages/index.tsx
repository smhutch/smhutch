import { WEB_LINKS, WORK_LINKS } from 'constants/resources'
import { link } from 'css/link'
import { motion, stagger, useSpring } from 'motion/react'
import type { NextPage } from 'next'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import { useMouse, useRafLoop, useTimeoutFn } from 'react-use'
import { css, cx } from 'system/css'
import { Container } from 'system/jsx'
import { container, flex, stack } from 'system/patterns'
import { STAGGER_FADE } from 'utils/motion'

import { hasAnimatedInIndex } from '@/atoms/animations'
import { homepageCanvas } from '@/canvas/homepage'
import { Meta } from 'components/Meta'
import { useIsDarkMode } from 'hooks/theme'
import { useSetAtom } from 'jotai'
import { doNothing } from 'remeda'
import type { ExternalLinkConfig } from 'types/content'

const SHOW_WEB_3 = false
const FOOTER_LINK_STAGGER_DELAY = 0.06

const Index: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const hasInteractedRef = useRef(false)

  const mouse = useMouse(canvasRef as React.RefObject<Element>)

  const alpha = useSpring(0, { bounce: 0 })
  const isOver = useSpring(0)
  const isDarkMode = useIsDarkMode()

  const setAnimated = useSetAtom(hasAnimatedInIndex)

  useRafLoop(() => {
    if (!canvasRef.current) return
    if (!ctxRef.current) return
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    homepageCanvas({
      canvas,
      ctx,
      config: { type: 'lines' },
      mouse,
      hasInteractedRef,
      isDarkMode,
      isOver,
      alpha,
    })
  })

  useEffect(() => {
    alpha.set(1)
  }, [])

  const footerSection1DelayInSeconds = 0.4
  const footerSection2DelayInSeconds =
    footerSection1DelayInSeconds + WORK_LINKS.length * FOOTER_LINK_STAGGER_DELAY
  const totalFooterStaggerDelayInSeconds =
    footerSection2DelayInSeconds + WEB_LINKS.length * FOOTER_LINK_STAGGER_DELAY
  const totalFooterStaggerDelayInMs = totalFooterStaggerDelayInSeconds * 1000

  useTimeoutFn(() => {
    setAnimated(true)
  }, totalFooterStaggerDelayInMs)

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
        onMouseMove={() => {
          hasInteractedRef.current = true
        }}
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
          onMouseOut={() => isOver.set(0)}
          onMouseOver={() => isOver.set(1)}
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
          })}
        />
      </div>
      <div
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          transition: 'all',
          transitionDuration: 'common',
        })}
      >
        <Container>
          <div
            className={cx(
              css({
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                margin: '0 auto',
                gap: '20',
              })
            )}
          >
            <FooterLinkList
              heading="Career"
              startDelay={footerSection1DelayInSeconds}
            >
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
            <FooterLinkList
              heading="Web"
              startDelay={footerSection2DelayInSeconds}
            >
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
          </div>
        </Container>
      </div>
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
        delayChildren: stagger(0.06, {
          from: 'first',
          startDelay: startDelay,
          ease: 'easeIn',
        }),
      }}
      className={css({
        pt: 8,
        pb: 16,
        borderColor: 'border',
        transition: 'common',
        transitionDuration: 'common',
      })}
    >
      {props.children}
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
      , crafts <motion.strong>design systems</motion.strong>, and values{' '}
      <motion.strong>type-safety</motion.strong>.
    </motion.p>
  )
}

export default Index
