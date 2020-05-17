import Random from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'
import cn from 'classnames'
import { quadIn } from 'eases'
import { useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const random = Random.createRandom()

const sketch = (canvas) => {
  const { height, width } = canvas.getBoundingClientRect()

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')

  // returns a draw function.
  return (playhead) => {
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

      ctx.globalAlpha = lerp(0.8, 0, p)
      ctx.save()
      ctx.beginPath()
      ctx.bezierCurveTo(
        0,
        lerp(lerp(0, height / 4, loop), height, p),
        width / 2 + width * noise,
        height / 4,
        width,
        lerp(0, height, p)
      )

      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
  }
}

const Index = () => {
  const canvasRef = useRef(null)
  const [resizing, setResizing] = useState(false)

  useEffect(() => {
    const duration = 20000 //ms

    let draw = sketch(canvasRef.current)
    let start = null
    let timeout = null
    let raf = null

    const tick = (timestamp) => {
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
        description="Scott M. Hutcheson. JavaScript Engineer at Sticker Mule."
        title="SMHutch"
      />
      <main>
        <Stack className="container py4 mb4">
          <Stack gap={4}>
            <Text el="h1" look="h2">
              Scott M. Hutcheson.
            </Text>
            <Text el="p">JavaScript Engineer at Sticker Mule.</Text>
          </Stack>
        </Stack>
        <canvas ref={canvasRef} className={cn({ resizing })} />
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
