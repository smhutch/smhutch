import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'

import { Sketch } from 'layouts/Sketch'

const random = Random.createRandom()

export const settings = {
  id: '005',
  title: 'Noise wave',
  initialSeed: '873674',
}

const sketch = ({ ctx, size }) => {
  ctx.fillStyle = 'white'
  const lines = random.range(50, 150)
  const steps = 100
  const marginX = size * 0.1
  const marginY = size * 0.2
  for (let line = 0; line < lines; line++) {
    const p = line / (lines - 1)
    const startX = marginX
    const endX = size - marginX
    const y = lerp(marginY, size - marginY, p)
    ctx.beginPath()
    for (let step = 0; step < steps; step++) {
      const stepP = step / (steps - 1)
      const n = random.noise2D(stepP, p)
      const lineX = lerp(startX, endX, stepP)
      const lineY = y + (marginY / 4) * Math.cos(Math.PI * n)
      ctx.lineTo(lineX, lineY)
    }
    ctx.stroke()
  }
  ctx.restore()
}

const props = {
  ...settings,
  random,
  sketch,
}

export async function getStaticProps() {
  const { getSketchProps } = require('lib/sketchProps')
  return await getSketchProps(settings.id)
}

export default function UI(initialProps) {
  return <Sketch {...props} {...initialProps} />
}
