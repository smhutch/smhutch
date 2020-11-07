import { lerp } from 'canvas-sketch-util/math'

import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '006',
  title: 'Merge',
  initialSeed: '41029',
}

const sketch005: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  const maxTriSize = size * 0.35
  const maxOffset = size * 0.3
  const triCenterX = random.range(-maxOffset, maxOffset)
  const triCenterY = random.range(0, maxOffset)

  const triangles = random.range(20, 40)

  const maxRotation = random.range(0.01, 0.1)

  const triangle = (s: number): void => {
    ctx.lineTo(0, -s)
    ctx.lineTo(s, s / 2)
    ctx.lineTo(-s, s / 2)
  }

  const col1 = 'white'
  const col2 = 'black'

  // Go to center
  ctx.translate(size / 2, size / 2)
  ctx.translate(0, maxTriSize / 5)
  ctx.lineWidth = Math.max(2, 5 - Math.ceil(triangles * 0.1))

  Array.from({ length: triangles }).forEach((_, i, array) => {
    const p = i / (array.length - 1)
    const triSize = lerp(maxTriSize, 0, p)
    const rotation = lerp(maxRotation, 0, p)

    ctx.save() // save at center point

    ctx.fillStyle = col1
    ctx.strokeStyle = col2
    ctx.translate(lerp(0, triCenterX, p), lerp(0, triCenterY, p))
    ctx.rotate(lerp(-rotation, 0, p))
    ctx.beginPath()
    triangle(triSize)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    ctx.restore() // back to center
    ctx.save() // save center point again

    ctx.fillStyle = col2
    ctx.strokeStyle = col1
    ctx.translate(lerp(0, triCenterX, p), lerp(0, triCenterY, p))
    ctx.rotate(lerp(rotation, 0, p))
    ctx.beginPath()
    triangle(triSize)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    ctx.restore() // back to center
  })

  ctx.restore()
}

export const sketch = sketch005
