import { lerp } from 'canvas-sketch-util/math'

import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '008',
  title: 'Dots',
  initialSeed: '842399',
}

// Convert linear interpolation of 0..1 to 0...1...0
const getNormalDistribution = (p: number) => Math.abs(Math.cos(Math.PI * p))
const getInvertedNormalDistribution = (p: number) =>
  lerp(1, 0, getNormalDistribution(p))

const sketch008: SketchFn = ({ ctx, size, random }) => {
  const lines = 64
  const dotsPerLine = random.rangeFloor(8, 24)
  const margin = size * 0.1
  const circleDiameter = size - margin * 2
  const circleRadius = circleDiameter / 2
  const maxRadius = (circleRadius / dotsPerLine) * 0.4
  const minRadius = maxRadius * 0.1

  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.fillStyle = 'black'

  for (let line = 0; line < lines; line++) {
    const p = line / (lines - 1)
    const pLoop = getInvertedNormalDistribution(p)

    const start = margin
    const end = size / 2 - margin

    ctx.save()
    ctx.translate(size / 2, size / 2)
    ctx.rotate(lerp(-Math.PI / 2, Math.PI * 1.5, p))

    for (let dot = 0; dot < dotsPerLine; dot++) {
      const pDot = dot / (dotsPerLine - 1)
      const noise = random.noise2D(pLoop, pDot)
      const radius = lerp(
        0,
        minRadius + (maxRadius - minRadius) * Math.abs(noise),
        pDot
      )

      ctx.save()
      ctx.beginPath()
      ctx.translate(lerp(start, end, pDot), 0)
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
    ctx.restore()
  }
}

export const sketch = sketch008
