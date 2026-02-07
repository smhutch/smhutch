import chroma from 'chroma-js'
import { lerp } from 'lib/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '001',
  title: 'Noise grid',
  initialSeed: 321268,
}

const sketch001: SketchFn = ({ ctx, size, random }) => {
  const count = random.rangeFloor(20, 100)
  ctx.fillStyle = 'white'

  const margin = size * 0.1

  for (let col = 0; col < count; col++) {
    for (let row = 0; row < count; row++) {
      const space = (size - margin * 2) / count
      const px = row / (count - 1)
      const py = col / (count - 1)

      const x = lerp(margin, size - margin - space, px)
      const y = lerp(margin, size - margin - space, py)
      const noise = random.noise2D(px, py)
      const scale = Math.sin(Math.PI * Math.abs(noise * 0.6))
      const color = chroma.hsl(lerp(160, 200, py), 1, lerp(0.6, 0.33, scale))

      ctx.fillStyle = color.hex()

      ctx.save()
      ctx.translate(x, y)

      ctx.strokeStyle = color
        .brighten(Math.PI * 0.2)
        .alpha(0.4)
        .hex()
      ctx.strokeRect(0, 0, space, space)

      const fillSize = lerp(space * 0.3, space * 0.8, scale)
      const startX = lerp(0, space - fillSize, px)
      const startY = lerp(0, space - fillSize, py)

      ctx.fillRect(startX, startY, fillSize, fillSize)

      ctx.restore()
    }
  }
}

export const sketch = sketch001
