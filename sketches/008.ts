import { lerp } from 'canvas-sketch-util/math'

import { getInvertedNormalDistribution } from 'lib/canvas'
import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '008',
  title: 'Ring',
  initialSeed: 812451,
}

const arc = {
  full: Math.PI * 2,
  half: Math.PI,
  quarter: Math.PI / 2,
}

const sketch008: SketchFn = ({ ctx, size, random }) => {
  const lines = 60
  const circlesPerLine = 60
  const maxRadius = 60
  const minRadius = 5
  const anglePerLine = arc.full / lines
  const startAngle = 0 - arc.quarter
  const circleCenter = size * 0.1
  const circleEdge = size / 2 - circleCenter
  const maxAlpha = 0.2
  const minAlpha = 0

  ctx.fillStyle = 'black'

  for (let line = 0; line < lines; line++) {
    const pLine = line / (lines - 1)
    const pLoop = getInvertedNormalDistribution(pLine)

    ctx.save()
    ctx.translate(size / 2, size / 2)
    ctx.rotate(lerp(startAngle, arc.full + startAngle - anglePerLine, pLine))

    for (let dot = 0; dot < circlesPerLine; dot++) {
      const pDot = dot / (circlesPerLine - 1)
      const noise = random.noise2D(pLoop, pDot)
      const absNoise = Math.abs(noise)
      const radius = lerp(minRadius, maxRadius, pDot)
      const translateX = lerp(circleCenter, circleEdge, pDot)
      const translateY = lerp(circleCenter * random.value(), 0, absNoise)

      const arcStartAngle = 0
      const arcEndAngle = lerp(arc.full, 0, pDot)

      ctx.globalAlpha = lerp(maxAlpha, lerp(minAlpha, maxAlpha, absNoise), pDot)

      ctx.save()
      ctx.beginPath()
      ctx.translate(translateX, translateY)
      ctx.arc(0, 0, radius, arcStartAngle, arcEndAngle)
      ctx.fill()
      ctx.restore()
    }
    ctx.restore()
  }
}

export const sketch = sketch008
