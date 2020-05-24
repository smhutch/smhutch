import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { Button } from 'components/Button'
import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const size = 1000

export const Sketch = ({
  extra = null,
  id,
  next,
  prev,
  random,
  sketch,
  title,
}) => {
  const router = useRouter()
  const canvasRef = useRef()

  const randomize = () => {
    const seed = random.getRandomSeed()
    // Re-seed the random module
    random.setSeed(seed)
    // Update URL state, to enable sharing.
    router.push(`/sketches/${id}?seed=${seed}`)
  }

  const draw = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    sketch({
      ctx,
      size,
    })
  }

  const redraw = () => {
    randomize()
    draw()
  }

  // Initial sketch.
  useEffect(() => {
    // Get search params from URL.
    // Next.js router won't work here because CSR query string
    // is empty on first render.
    const params = new URL(document.location).searchParams
    const urlSeed = params.get('seed')
    if (urlSeed) {
      random.setSeed(urlSeed)
    } else {
      randomize()
    }

    // Draw initial sketch.
    draw()

    const handleKeys = (e) => {
      // Space
      if (e.keyCode === 32) {
        // Prevent scrolling.
        e.preventDefault()
        redraw()
      }

      // Left
      if (prev && e.keyCode === 37) {
        router.push(`/sketches/${prev}`)
      }

      // Right
      if (next && e.keyCode === 39) {
        router.push(`/sketches/${next}`)
      }

      // s character
      if (e.keyCode == 83) {
        if (e.getModifierState('Meta')) {
          // Prevent browser from saving.
          e.preventDefault()
          const data = canvasRef.current.toDataURL('image/png')
          const anchor = document.createElement('a')
          const seed = random.getSeed()
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
  }, [])

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
                <Link href={`/sketches/${prev}`}>
                  <a className="mr3" title="previous">
                    &larr;
                  </a>
                </Link>
              )}
              <Text className="mr3" variant="mono" inline>
                {id}
              </Text>
              {next && (
                <Link href={`/sketches/${next}`}>
                  <a title="next">&rarr;</a>
                </Link>
              )}
            </Stack>
          </div>
          <div className="canvas">
            <canvas ref={canvasRef} height={size} width={size} />
            {extra}
          </div>
          <div className="actions">
            {random.getSeed() && (
              <Button onClick={redraw} variant="link">
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

            .canvas {
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
