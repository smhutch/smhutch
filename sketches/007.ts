import { lerp } from 'utils/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '007',
  title: 'Routes',
  initialSeed: 428556,
}

const sketch007: SketchFn = ({ ctx, size, random }) => {
  const count = random.rangeFloor(20, 100)
  const margin = size * 0.1
  const marginSize = margin * 2
  const totalBoxSize = size - marginSize
  const boxSize = totalBoxSize / count
  const shapes = [
    { value: 'top', weight: 200 },
    { value: 'dot', weight: 50 },
    { value: 'left', weight: 50 },
    { value: 'skew', weight: 100 },
  ] as const

  ctx.globalAlpha = 1
  ctx.lineWidth = 1
  ctx.lineCap = 'round'
  ctx.fillStyle = 'black'

  for (let col = 0; col < count; col++) {
    const py = col / (count - 1)
    const y = lerp(margin, size - margin - boxSize, py)
    for (let row = 0; row < count; row++) {
      const px = row / (count - 1)
      const x = lerp(margin, size - margin - boxSize, px)

      ctx.save()
      ctx.translate(x, y)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      const shape = random.weightedSet(shapes)
      switch (shape) {
        case 'top':
          ctx.lineTo(boxSize, 0)
          ctx.stroke()
          break
        case 'left':
          ctx.lineTo(0, boxSize)
          ctx.stroke()
          break
        case 'dot':
          ctx.arc(0, 0, boxSize / 8, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          break
        case 'skew':
          ctx.lineTo(boxSize, boxSize)
          ctx.stroke()
          break
        default:
          break
      }
      ctx.closePath()
      ctx.restore()
    }
  }
}

export const sketch = sketch007
