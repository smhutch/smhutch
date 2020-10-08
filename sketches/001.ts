import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes/200.json'
import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '001',
  title: 'Noise grid',
  initialSeed: '14168',
}

const sketch001: SketchFn = ({ ctx, size, random }) => {
  const count = 20
  ctx.fillStyle = 'white'

  const palette = random.pick(palettes)
  const margin = size * 0.1

  for (let col = 0; col < count; col++) {
    for (let row = 0; row < count; row++) {
      const space = (size - margin * 2) / count
      const px = row / (count - 1)
      const py = col / (count - 1)

      const x = lerp(margin, size - margin, px)
      const y = lerp(margin, size - margin, py)
      const noise = random.noise2D(px, py)
      const scale = Math.sin(noise)

      ctx.globalAlpha = 1
      ctx.fillStyle = random.pick(palette)

      ctx.save()
      ctx.beginPath()
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.fillRect(-space / 2, -space / 2, space, space)
      ctx.fill()
      ctx.restore()
    }
  }
}

export const sketch = sketch001
