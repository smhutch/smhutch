import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { Button } from 'components/Button'
import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const size = 1000

const isPuppeteer = process.env.IS_PUPPETEER

export const Sketch = ({
  extra = null,
  id,
  initialSeed,
  next,
  prev,
  random,
  sketch,
  title,
}) => {
  const router = useRouter()
  const canvasRef = useRef()

  const reseed = (seed = random.getRandomSeed()) => {
    // Re-seed the random module
    random.setSeed(seed)

    // Update URL state, to enable sharing.
    router.push({
      pathname: `/sketches/${id}`,
      query: {
        seed
      }
    })
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
    reseed()
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
      reseed(initialSeed)
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
      <main
        className={cn('py4', {
          isPuppeteer,
        })}
      >
        <div className="sketch container">
          <div className="info">
            <Stack>
              {isPuppeteer && (
                <Text className="mb3" variant="mono">
                  Generative sketches — {id}
                </Text>
              )}
              <Text el="h1">{title}.</Text>
              {!isPuppeteer && <Pagination id={id} next={next} prev={prev} />}
            </Stack>
          </div>
          <div className="canvas">
            <canvas ref={canvasRef} height={size} width={size} />
            {extra}
          </div>
          <div className="actions">
            {random.getSeed() && !isPuppeteer && (
              <Button onClick={redraw} variant="link">
                Randomize
              </Button>
            )}
          </div>
          {isPuppeteer && <img alt="SMHutch" src="/logo-dark.svg" />}
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

          .isPuppeteer {
            width: 100%;
            height: 100vh;
          }

          .isPuppeteer .sketch {
            position: relative;
            height: calc(100vh - var(--space-4) - var(--space-4));
            grid-template-columns: 1fr 500px;
            grid-template-rows: 100%;
          }

          .isPuppeteer .sketch.container {
            max-width: 1100px;
          }

          .isPuppeteer .canvas {
            display: flex;
            align-items: center;
          }

          .isPuppeteer img {
            width: 50px;
            position: absolute;
            bottom: 30px;
            left: 20px;
          }

          .isPuppeteer canvas {
            width: 566px;
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
              margin-top: calc(0px - var(--space-6));
            }

            .info {
              margin-top: var(--space-5);
            }

            .actions {
              margin-bottom: var(--space-6);
              padding-bottom: var(--space-3);
            }
          }
        `}
      </style>
    </>
  )
}

function Pagination({ id, next, prev }) {
  return (
    <>
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
    </>
  )
}
