import { lerp } from 'lib/math'

import { getInvertedNormalDistribution } from 'lib/canvas'
import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '009',
  title: 'Spark',
  initialSeed: 653121,
}

const DEBUG = false

const sketch009: SketchFn = ({ ctx, size, random }) => {
  const grid = random.rangeFloor(5, 12)
  const margin = size * 0.1
  const outerSpace = size - margin * 2
  const outerBoxSize = outerSpace / grid
  const boxMargin = outerBoxSize * 0.1
  const boxSize = outerBoxSize - boxMargin * 2

  const maxlines = random.rangeFloor(20, 40)

  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  for (let col = 0; col < grid; col++) {
    const px = col / (grid - 1)
    const x = lerp(margin, size - margin - boxSize, px)

    ctx.save()

    ctx.beginPath()

    for (let row = 0; row < grid; row++) {
      const py = row / (grid - 1)
      const ppy = getInvertedNormalDistribution(py)
      const y = lerp(margin, size - margin - boxSize, py)
      const lines = Math.ceil(lerp(8, maxlines, ppy))
      const lineWidth = boxSize / lines

      ctx.save()
      ctx.translate(x, y)
      ctx.lineWidth = 1
      if (DEBUG) {
        ctx.fillStyle = '#f5f5f5'
        ctx.fillRect(0, 0, boxSize, boxSize)
      }

      const upperLimit = 0
      const lowerLimit = boxSize
      const baseline = lerp(upperLimit, lowerLimit, py)
      const spaceAboveBaseline = baseline
      const spaceBelowBaseline = lowerLimit - baseline
      const rowHasSpaceAbove = baseline !== 0
      const noise = random.noise2D(px, py)

      ctx.beginPath()

      for (let line = 0; line < lines; line++) {
        const pl = line / (lines - 1 || 1)
        const ppl = getInvertedNormalDistribution(pl)

        const renderAbove = rowHasSpaceAbove ? random.chance(py) : false

        const maxYOffset = renderAbove ? spaceAboveBaseline : spaceBelowBaseline
        const yOffset = maxYOffset

        const startX = lerp(0, boxSize - lineWidth, pl)
        const startY = baseline

        const endX = startX + lineWidth
        const endY = lerp(
          baseline,
          renderAbove
            ? baseline - yOffset * Math.max(0.1, noise)
            : baseline + yOffset * Math.max(0.1, noise),
          ppl
        )

        ctx.lineTo(startX, startY)
        ctx.lineTo(endX, endY)
      }

      ctx.stroke()
      ctx.restore()
    }
    ctx.restore()
  }
}

export const sketch = sketch009
