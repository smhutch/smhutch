import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes/200'

export const settings = {
  title: 'Noise grid',
}

const count = 20

export const sketch = () => {
  // render loop
  return ({ ctx, size, random }) => {
    const palette = random.pick(palettes)
    const margin = size / 10

    ctx.globalAlpha = 1
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, size, size)

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
        ctx.fillRect(-space, -space, space, space)
        ctx.fill()
        ctx.restore()
      }
    }
  }
}
