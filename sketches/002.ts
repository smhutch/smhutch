import { lerp } from 'canvas-sketch-util/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '002',
  title: 'Bezier Arc',
  initialSeed: '629560',
}

const sketch002: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2

  // Geometry
  const margin = size * 0.1
  const mid = size / 2

  // Curve positioning.
  const startX = margin
  const startY = mid
  const endX = size - margin
  const endY = mid

  const rowCount = 50
  for (let row = 0; row < rowCount; row++) {
    const p = row / (rowCount - 1)
    const noise = random.noise1D(p)

    ctx.globalAlpha = lerp(0.5, 0.2, p)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.bezierCurveTo(
      mid / 2,
      lerp(mid, margin, p),
      mid + mid / 2,
      lerp(margin, mid, p) - mid * noise,
      endX,
      endY
    )
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
}

export const sketch = sketch002
