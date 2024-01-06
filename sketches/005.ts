import { lerp } from 'canvas-sketch-util/math'

import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '005',
  title: 'Noise wave',
  initialSeed: 450581,
}

const sketch005: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  ctx.lineWidth = 1

  const lines = random.range(50, 100)
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

export const sketch = sketch005
