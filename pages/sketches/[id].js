import Random from 'canvas-sketch-util/random'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'

import { Button } from 'components/Button'
import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { sketchIds, sketchSettings } from 'lib/paths'

const random = Random.createRandom()
const canvasSize = 1000

const Sketch = ({ id, title, next, prev }) => {
  const router = useRouter()

  // State
  const [canvasStatus, setCanvasStatus] = useState('PREFLIGHT')
  const [seed, setSeed] = useState()

  // Refs
  const canvasRef = useRef()
  const ctxRef = useRef()
  const drawFnRef = useRef()

  const reSeed = () => {
    const newSeed = random.getRandomSeed()
    // Update local state.
    setSeed(newSeed)
    // Re-seed the random module
    random.setSeed(seed)
    // Update URL state, to enable sharing.
    router.push('/sketches/[id]', `/sketches/${id}?seed=${newSeed}`)
  }

  // Fetch sketch module when page hydrates.
  useEffect(() => {
    // Re-set all state when id changes.
    setCanvasStatus('PREFLIGHT')
    setSeed(null)

    // Async effect due to import.
    const init = async () => {
      // Dynamically import the sketch.
      const { sketch } = await import(`sketches/${id}`)

      // Get canvas
      const canvas = canvasRef.current

      // Get canvas context.
      const ctx = canvas.getContext('2d')

      // Initialize draw function.
      const draw = sketch()

      // Create references to canvas context and drawFn.
      ctxRef.current = ctx
      drawFnRef.current = draw

      setCanvasStatus('READY')
    }

    init()
  }, [id])

  // Handle back and forward within the url.
  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URL(document.location).searchParams
      const urlSeed = params.get('seed')
      if (urlSeed) {
        setSeed(urlSeed)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [id])

  // Key listeners.
  useEffect(() => {
    const handleKeys = (e) => {
      // Space
      if (e.keyCode === 32) {
        reSeed()
      }

      // Left
      if (prev && e.keyCode === 37) {
        router.push('/sketches/[id]', `/sketches/${prev}`)
      }

      // Right
      if (next && e.keyCode === 39) {
        router.push('/sketches/[id]', `/sketches/${next}`)
      }

      // s character
      if (e.keyCode == 83) {
        if (e.getModifierState('Meta')) {
          // Prevent browser from saving.
          e.preventDefault()
          const data = canvasRef.current.toDataURL('image/png')
          const anchor = document.createElement('a')
          anchor.setAttribute('download', `${id}-${seed}.png`)
          anchor.setAttribute('href', data)
          anchor.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeys)
    return () => {
      document.removeEventListener('keydown', handleKeys)
    }
  }, [id, seed, next, prev])

  // Transform URL query seed to local state.
  useEffect(() => {
    const { query } = router
    if (query.seed && seed !== query.seed) {
      return setSeed(query.seed)
    }
  }, [router.query.seed])

  useEffect(() => {
    if (canvasStatus === 'PREFLIGHT') return

    if (!seed) {
      reSeed()
    } else {
      random.setSeed(seed)
      const draw = drawFnRef.current
      const ctx = ctxRef.current
      draw({
        ctx,
        size: canvasSize,
        random,
      })
    }
  }, [id, seed, canvasStatus])

  return (
    <>
      <Meta
        description="A generative sketch by Scott Hutcheson."
        image={`sketches/${id}/meta.png`}
        title={`${id} — ${title}.`}
      />
      <main className="py4">
        <div className="sketch container">
          <div className="info">
            <Stack>
              <Text el="h1">{title}.</Text>
              {prev && (
                <Link as={`/sketches/${prev}`} href="/sketches/[id]">
                  <a className="mr3" title="previous">
                    &larr;
                  </a>
                </Link>
              )}
              <Text className="mr3" variant="mono" inline>
                {id}
              </Text>
              {next && (
                <Link as={`/sketches/${next}`} href="/sketches/[id]">
                  <a title="next">&rarr;</a>
                </Link>
              )}
            </Stack>
          </div>
          <canvas ref={canvasRef} height={canvasSize} width={canvasSize} />
          <div className="actions">
            {seed && (
              <Button onClick={reSeed} variant="link">
                Randomize
              </Button>
            )}
          </div>
        </div>
        <div className="bg" />
      </main>
      <style jsx>
        {`
          .sketch {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: var(--space-4);
            max-width: 1000px;
          }

          canvas {
            background-color: white;
            width: 100%;
            max-width: 500px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }

          @media screen and (min-width: 800px) {
            .sketch {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr auto;
            }

            canvas {
              grid-row: 1 / -1;
              grid-column: 2 / 3;
            }

            .bg {
              height: 30vh;
              min-height: 200px;
              width: 100%;
              left: 0;
              background: linear-gradient(#f5f5f5, white);
            }

            .info {
              margin-top: var(--space-5);
            }

            .actions {
              margin-bottom: var(--space-6);
              padding-bottom: var(--space-3);
            }

            .bg {
              margin-top: calc(0px - var(--space-6));
            }
          }
        `}
      </style>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const { title } = await sketchSettings(id)
  const ids = await sketchIds()
  const currentIndex = ids.findIndex((v) => v === id)
  const next = ids[currentIndex + 1] || null
  const prev = ids[currentIndex - 1] || null

  return {
    props: {
      id,
      title,
      next,
      prev,
    },
  }
}

export async function getStaticPaths(_ctx) {
  const sketches = await sketchIds()
  const paths = sketches.map((sketchId) => ({
    params: {
      id: sketchId,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Sketch
