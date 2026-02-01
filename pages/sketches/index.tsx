import { sketchIndex } from 'build/sketches'
import { createRandom } from 'canvas-sketch-util/random'
import { motion } from 'framer-motion'
import type { GetStaticProps } from 'next'
import { getRoute } from 'next-type-safe-routes'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { css, cx } from 'system/css'
import { Container } from 'system/jsx'
import { flex, stack } from 'system/patterns'

import type { SketchFn, SketchSettings } from 'types/sketches'

const CANVAS_SIZE = 1000

const Sketches: React.FC<{ sketches: SketchSettings[] }> = ({ sketches }) => {
  return (
    <main>
      <div
        className={css({
          background: 'gray.100',
          height: '100%',
        })}
      >
        <Container pb={12} pt={4}>
          <ul
            className={stack({
              margin: '0 auto',
              gap: 4,
              display: 'grid',
              gridAutoFlow: 'row dense',
              sm: {
                gridTemplateColumns: '1fr 1fr 1fr',
              },
              xl: {
                gap: 5,
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
              },
            })}
          >
            {sketches.map((sketch) => {
              return (
                <SketchGridItem
                  key={sketch.id}
                  id={sketch.id}
                  initialSeed={sketch.initialSeed}
                  title={sketch.title}
                />
              )
            })}
          </ul>
        </Container>
      </div>
    </main>
  )
}

const DETAILS_CLASSNAME = 'details'

const SketchGridItem = (
  props: Pick<SketchSettings, 'id' | 'initialSeed' | 'title'>
) => {
  const randomRef = useRef(createRandom())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sketchRef = useRef<SketchFn>()
  const [ready, setReady] = useState(false)
  const visible = ready

  useEffect(() => {
    const getSketch = async () => {
      if (!randomRef.current) return

      randomRef.current.setSeed(props.initialSeed)

      const mod = await import(`../../sketches/${props.id}`)
      sketchRef.current = mod.sketch
      setReady(true)
    }
    getSketch()
  }, [props.id])

  useEffect(() => {
    if (!ready) return

    const random = randomRef.current
    if (!random) return
    const sketch = sketchRef.current
    if (!sketch) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.save()

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.fill()
      sketch({
        ctx,
        size: CANVAS_SIZE,
        random,
      })
      ctx.restore()
    }

    draw()
  }, [props.id, ready])

  const href = getRoute({
    route: '/sketches/[sketch]',
    params: {
      sketch: props.id,
    },
    query: {
      seed: props.initialSeed,
    },
  })

  return (
    <motion.li
      animate={{ y: visible ? 0 : 20, opacity: visible ? 1 : 0 }}
      className={css({
        position: 'relative',
        overflow: 'hidden',

        transition: 'box-shadow 0.2s ease-in-out',
        opacity: 0,
        borderRadius: '2xl',
        boxShadow: 'md',

        '&:hover': {
          boxShadow: 'lg',
        },

        sm: {
          '&:nth-of-type(4n + 1)': {
            gridColumn: 'span 2',
            gridRow: 'span 2',
          },
        },
        xl: {
          '&:nth-of-type(4n + 1)': {
            gridColumn: 'span 1',
            gridRow: 'span 1',
          },
          '&:nth-of-type(7n + 1)': {
            gridColumn: 'span 2',
            gridRow: 'span 2',
          },
        },
      })}
      initial={{ opacity: 0 }}
      whileHover={{ y: -4 }}
    >
      <Link href={href}>
        <canvas
          ref={canvasRef}
          className={css({
            width: '100%',
            aspectRatio: '1 / 1',
            transform: '1',
          })}
          height={CANVAS_SIZE}
          width={CANVAS_SIZE}
        />
        <motion.div
          className={cx(
            DETAILS_CLASSNAME,
            flex({
              position: 'absolute',
              direction: 'column',
              justify: 'space-between',
              alignItems: 'flex-start',
              px: 4,
              py: 3,
              left: 2,
              right: 2,
              backdropFilter: 'blur(10px) brightness(1.4)',
              backgroundColor: 'rgba(248, 248, 248, 0.9)',
              border: '1px solid',
              borderColor: 'gray.100',
              borderRadius: 'xl',
              minHeight: '100px',
              transition: 'all 0.3s ease-in-out',
              opacity: 0,
              bottom: -1,

              'li:hover &': {
                bottom: 2,
                opacity: 1,
              },
            })
          )}
        >
          <span
            className={css({
              fontWeight: 'semibold',
              fontSize: '2xl',
              letterSpacing: 'tight',
              lineHeight: 1,

              xl: {
                fontSize: '3xl',
              },
            })}
          >
            {props.title}
          </span>
          <span
            className={css({
              fontSize: 'sm',
              color: 'gray.600',
              lineHeight: 1,
            })}
          >
            #{props.id}
          </span>
        </motion.div>
      </Link>
    </motion.li>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const sketches = sketchIndex()

  return {
    props: {
      sketches,
    },
  }
}

export default Sketches
