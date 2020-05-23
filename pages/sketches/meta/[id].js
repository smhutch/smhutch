import Random from 'canvas-sketch-util/random'
import { useRef, useEffect, useState } from 'react'

import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { sketchIds, sketchSettings } from 'lib/paths'

const random = Random.createRandom()
const canvasSize = 1000

const Sketch = ({ id, title }) => {
  // State
  const [canvasStatus, setCanvasStatus] = useState('PREFLIGHT')

  // Refs
  const canvasRef = useRef()
  const ctxRef = useRef()
  const drawFnRef = useRef()

  // Fetch sketch module when page hydrates.
  useEffect(() => {
    // Re-set all state when id changes.
    setCanvasStatus('PREFLIGHT')

    // Async effect due to import.
    const init = async () => {
      // Dynamically import the sketch.
      const { settings, sketch } = await import(`sketches/${id}`)

      // Get canvas
      const canvas = canvasRef.current

      // Get canvas context.
      const ctx = canvas.getContext('2d')

      // Set seed, if defined in settings.
      random.setSeed(settings.previewSeed || random.getRandomSeed())

      // Initialize draw function.
      const draw = sketch()

      // Create references to canvas context and drawFn.
      ctxRef.current = ctx
      drawFnRef.current = draw

      setCanvasStatus('READY')
    }

    init()
  }, [id])

  useEffect(() => {
    if (canvasStatus === 'PREFLIGHT') return
    const draw = drawFnRef.current
    const ctx = ctxRef.current
    console.log(random.getSeed())
    draw({
      ctx,
      size: canvasSize,
      random,
    })
  }, [id, canvasStatus])

  return (
    <>
      <main>
        <div className="sketch py5">
          <div className="info">
            <Stack>
              <Text className="mb3" variant="mono">
                Generative Sketches — {id}
              </Text>
              <Text el="h1">{title}.</Text>
            </Stack>
            <img alt="SMHutch" src="/logo-dark.svg" />
          </div>
          <canvas ref={canvasRef} height={canvasSize} width={canvasSize} />
        </div>
        <div className="bg" />
      </main>
      <style jsx>
        {`
          .sketch {
            display: grid;
            grid-gap: var(--space-4);
            grid-template-columns: 1fr 500px;
            grid-template-rows: 1fr;
            padding: 50px;
            height: calc(100vh - 100px);
          }

          canvas {
            background-color: white;
            width: 100%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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
            position: relative;
          }

          .actions {
            margin-bottom: var(--space-6);
            padding-bottom: var(--space-3);
          }

          .bg {
            position: fixed;
            bottom: 0;
            height: 30vh;
            z-index: -1;
          }

          img {
            width: 50px;
            position: absolute;
            bottom: 0;
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
      title,
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

Sketch.meta = true

export default Sketch
