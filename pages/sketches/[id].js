import Random from 'canvas-sketch-util/random'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'

import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { sketchIds, sketchSettings } from 'lib/paths'

const random = Random.createRandom()
const canvasSize = 1000

const Sketch = ({ id, title }) => {
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
    router.push('/sketches/[id]', `/sketches/001?seed=${newSeed}`)
  }

  // Fetch sketch module when page hydrates.
  useEffect(() => {
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
  }, [])

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
  }, [])

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
  }, [seed, canvasStatus])

  return (
    <>
      <main className="py4">
        <div className="sketch container">
          <div className="info">
            <Stack>
              <Text el="h1">{title}.</Text>
              <Text variant="mono">{id}</Text>
            </Stack>
          </div>
          <canvas ref={canvasRef} height={canvasSize} width={canvasSize} />
          <div className="actions">
            <Flex gap={4}>
              {seed && (
                <Button onClick={reSeed} variant="link">
                  Randomize
                </Button>
              )}
              <a
                href="#download"
                onClick={({ currentTarget }) => {
                  const data = canvasRef.current.toDataURL('image/png')
                  currentTarget.setAttribute('download', `${id}-${seed}.png`)
                  currentTarget.setAttribute('href', data)
                }}
                variant="link"
              >
                Download
              </a>
            </Flex>
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

            .content {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
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

  return {
    props: {
      id,
      title: title,
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
