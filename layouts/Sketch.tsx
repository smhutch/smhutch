import { Random } from 'canvas-sketch-util/random'
import cx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import type { SketchAsset, SketchFn } from 'types/sketches'

import { Button } from 'components/Button'
import { Credit } from 'components/Credit'
import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const size = 1000

const isPuppeteer = process.env.IS_PUPPETEER

interface Props {
  id: string
  initialSeed: string
  next?: string
  prev?: string
  random: Random
  title: string
}

export const Sketch: React.FC<Props> = ({
  id,
  initialSeed,
  next,
  prev,
  random,
  title,
}) => {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>()
  const [asset, setAsset] = useState<SketchAsset>()
  const [sketchCache, setSketchCache] = useState<Record<string, SketchFn>>({})

  useEffect(() => {
    const getSketch = async () => {
      if (sketchCache[id]) return

      const mod = await import(`../sketches/${id}`)
      setSketchCache({
        ...sketchCache,
        [id]: mod.sketch,
      })
    }

    getSketch()
  }, [id, sketchCache])

  useEffect(() => {
    const reseed = (seed = random.getRandomSeed()) => {
      // Re-seed the random singleton
      random.setSeed(seed)

      // Update URL state, to enable sharing.
      router.push('/sketches/[sketch]', {
        pathname: `/sketches/${id}`,
        query: {
          seed,
        },
      })
    }

    // Get search params from URL.
    // Next.js router won't work here because CSR query string
    // is empty on first render, which creates a race condition.
    const url = new URL(document.location.href)
    const params = new URLSearchParams(url.search)
    const urlSeed = params.get('seed')
    if (urlSeed) {
      random.setSeed(urlSeed)
      reseed(urlSeed)
    } else {
      reseed(initialSeed)
    }

    const sketch = sketchCache[id]
    if (!sketch) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.save()

    const clear = () => {
      setAsset(null)
      ctx.clearRect(0, 0, size, size)
    }

    const draw = () => {
      clear()
      sketch({
        expose: ({ asset }) => {
          setAsset(asset)
        },
        ctx,
        size,
        random,
      })

      ctx.restore()
    }

    draw()

    const handleKeys = (e: KeyboardEvent) => {
      // Space
      if (e.keyCode === 32) {
        // Prevent scrolling.
        e.preventDefault()
        reseed()
      }

      // Left
      if (prev && e.keyCode === 37) {
        clear()
        router.push('/sketches/[sketch]', `/sketches/${prev}`)
      }

      // Right
      if (next && e.keyCode === 39) {
        clear()
        router.push('/sketches/[sketch]', `/sketches/${next}`)
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
  }, [id, sketchCache, router.asPath])

  return (
    <>
      <Meta
        description="A generative sketch by Scott Hutcheson."
        image={`sketches/${id}/meta.png`}
        title={`${id} — ${title}.`}
      />
      <main
        className={cx('py4', {
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
            {!isPuppeteer && (
              <div className="py3">{asset && <Credit {...asset.credit} />}</div>
            )}
          </div>
          <div className="actions">
            {random.getSeed() && !isPuppeteer && (
              <Button
                className="mr4"
                onClick={() =>
                  router.push('/sketches/[sketch]', {
                    pathname: `/sketches/${id}`,
                    query: {
                      seed: random.getRandomSeed(),
                    },
                  })
                }
                variant="link"
              >
                Randomize
              </Button>
            )}
            {!isPuppeteer && (
              <a
                href={`https://github.com/smhutch/smhutch/tree/main/sketches/${id}.ts`}
                rel="noopener noreferrer"
                target="_blank"
                title="previous"
              >
                View code
              </a>
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
              grid-template-columns: 1fr 500px;
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

interface PaginationProps {
  id: string
  next?: string
  prev?: string
}

const Pagination: React.FC<PaginationProps> = ({ id, next, prev }) => {
  return (
    <>
      {prev && (
        <Link as={`/sketches/${prev}`} href="/sketches/[sketch]">
          <a className="mr3" title="previous">
            &larr;
          </a>
        </Link>
      )}
      <Text className="mr3" variant="mono" inline>
        {id}
      </Text>
      {next && (
        <Link as={`/sketches/${next}`} href="/sketches/[sketch]">
          <a title="next">&rarr;</a>
        </Link>
      )}
    </>
  )
}
