import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import cx from 'clsx'
import { quadIn } from 'eases'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const random = Random.createRandom()

const sketch = (canvas: HTMLCanvasElement) => {
  const { height, width } = canvas.getBoundingClientRect()

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')

  return (playhead: number): void => {
    ctx.globalAlpha = 1
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = 'black'

    const rowGap = 10
    const rowCount = Math.floor(height / rowGap)
    // Convert 0...1 playhead to 0...1...0
    const loop = quadIn(Math.sin(playhead * Math.PI))

    for (let row = 0; row < rowCount; row++) {
      const p = row / (rowCount - 1)
      const noise = random.noise2D(p, loop)
      const y = lerp(height, 0, p)

      ctx.globalAlpha = lerp(0, 0.8, p)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.bezierCurveTo(
        width / 2 + width * noise,
        0,
        width / 2,
        height / 2 + (height / 8) * noise,
        width,
        y
      )
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
  }
}

const Index: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [resizing, setResizing] = useState(false)

  useEffect(() => {
    const duration = 20000 // 20s in ms

    let draw = sketch(canvasRef.current)
    let start = null
    let timeout = null
    let raf = null

    const tick = (timestamp: number) => {
      if (!start) {
        start = timestamp
      }

      const playhead = (timestamp - start) / duration
      draw(playhead)

      raf = requestAnimationFrame(tick)
      if (playhead > 1) {
        start = timestamp
      }
    }

    const resetCanvas = () => {
      // Reset timeout to allow additional resize
      timeout = null
      // Update drawFn using latest canvas.
      draw = sketch(canvasRef.current)
      // Show canvas
      setResizing(false)
    }

    const debounceResize = () => {
      // When resize starts, hide canvas.
      if (!timeout) {
        setResizing(true)
      }
      // Debounce resetCanvas until resizing is complete.
      clearTimeout(timeout)
      timeout = setTimeout(resetCanvas, 250)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', debounceResize)

    return () => {
      window.removeEventListener('resize', debounceResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Meta
        description="Scott M. Hutcheson. JavaScript Engineer."
        title="SMHutch"
      />
      <main>
        <Stack className="container py4 mb4">
          <Stack gap={4}>
            <Text el="h1" look="h2">
              Scott M. Hutcheson.
            </Text>
            <Text el="p">JavaScript Engineer.</Text>
          </Stack>
        </Stack>
        <canvas ref={canvasRef} className={cx({ resizing })} />
      </main>
      <style jsx>{`
        canvas {
          display: block;
          width: 100%;
          height: 40vh;
          transition: 0.4s ease opacity;
        }

        canvas.resizing {
          opacity: 0;
        }
      `}</style>
    </>
  )
}

export default Index
