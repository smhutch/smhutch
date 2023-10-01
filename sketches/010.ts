import { lerp } from 'canvas-sketch-util/math'

import { getInvertedNormalDistribution } from 'lib/canvas'
import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '010',
  title: 'Spark2',
  initialSeed: '653121',
}

const sketch009: SketchFn = ({ ctx, size, random }) => {
  const grid = 20
  const margin = size * 0.1
  const outerSpace = size - margin * 2
  const outerBoxSize = outerSpace / grid
  const boxSize = outerBoxSize

  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  for (let col = 0; col < grid; col++) {
    const px = col / (grid - 1)
    const ppx = getInvertedNormalDistribution(px)
    const x = lerp(margin, size - margin - boxSize, px)

    ctx.save()

    ctx.beginPath()

    for (let row = 0; row < grid; row++) {
      const py = row / (grid - 1)
      const ppy = getInvertedNormalDistribution(py)
      const noise = random.noise2D(ppx, ppy)
      const y = lerp(margin, size - margin - boxSize, py)
      const lines = Math.ceil(lerp(1, 4, Math.abs(noise)))

      ctx.save()
      ctx.translate(x, y)
      ctx.lineWidth = 1
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'bevel'
      ctx.fillStyle = 'red'

      const upperLimit = 0
      const lowerLimit = boxSize
      const baseline = lerp(upperLimit, lowerLimit, py)
      const spaceAboveBaseline = baseline
      const spaceBelowBaseline = lowerLimit - baseline
      const rowHasSpaceAbove = baseline !== 0

      ctx.beginPath()
      ctx.arc(0, 0, boxSize * 0.5, Math.PI * noise, Math.PI)
      ctx.stroke()
      ctx.closePath()

      ctx.restore()
    }
    ctx.restore()
  }
}

export const sketch = sketch009
