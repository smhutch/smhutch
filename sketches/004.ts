import chroma from 'chroma-js'
import { lerp } from 'lib/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '004',
  title: 'Convergence',
  initialSeed: 873674,
}

const sketch004: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1

  const center = size / 2

  const count = random.rangeFloor(60, 180)

  const stackMovementX = random.range(0.1, 0.4)
  const stackMovementY = random.range(0.1, 0.4)
  const maxRotation = random.range(1, 3)
  const maxOffset = random.range(0.02, 0.02)
  const hue = random.pick([140, 160, 180])
  const maxLightness = random.range(0.4, 0.7)

  for (let item = 0; item < count; item++) {
    const p = item / (count - 1)
    const noise = random.noise1D(p)
    const color = chroma.hsl(
      hue,
      lerp(0.1, maxLightness, p),
      lerp(0.1, 0.65, p)
    )

    ctx.save()
    ctx.beginPath()

    const startX = 0 - center
    const startY = 0 - center
    const endX = size
    const endY = size

    ctx.translate(
      lerp(center, center + size * stackMovementX * noise, p),
      lerp(center, center + center * stackMovementY * noise, p)
    )
    ctx.rotate(Math.PI * lerp(0, maxRotation * noise, p))

    // Get incrementally smaller
    const scale = lerp(1, 0, p)
    ctx.scale(scale, scale)

    // Darker lower layer
    ctx.fillStyle = color.darken(0.8).alpha(0.8).hex()
    ctx.fillRect(startX, startY, endX, endY)

    // Rotate a little bit
    ctx.rotate(Math.PI * lerp(0, maxOffset, noise * p))

    // Lighter upper layer
    ctx.fillStyle = color.hex()
    ctx.fillRect(startX, startY, endX, endY)

    ctx.restore()
  }
}

export const sketch = sketch004
