import { lerp } from 'canvas-sketch-util/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '002',
  title: 'Bezier Arcs',
  initialSeed: '934012',
}

const sketch002: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1

  // Geometry
  const margin = size * 0.1

  const sectionCount = random.rangeFloor(3, 8)

  const ySpace = size - margin * 2
  const ySpaceSection = ySpace / sectionCount
  const ySpaceSectionMid = ySpaceSection / 2

  for (let section = 0; section < sectionCount; section++) {
    const sectionP = section / (sectionCount - 1)

    const lineCount = random.rangeFloor(12, 24)

    for (let line = 0; line < lineCount; line++) {
      const lineP = line / (lineCount - 1)
      const noise = random.noise2D(sectionP, lineP)

      const xStart = margin
      const xEnd = size - margin
      const xRange = xEnd - xStart
      const y = lerp(
        margin + ySpaceSectionMid,
        size - margin - ySpaceSectionMid,
        sectionP
      )

      ctx.globalAlpha = lerp(0.1, 0.3, lineP)
      ctx.save()
      ctx.beginPath()

      ctx.moveTo(xStart, y)
      ctx.bezierCurveTo(
        // Control point 1
        lerp(xRange * 0.1, xRange * 0.8, lineP),
        y - ySpaceSection * 1.4 * noise,
        // Control point 2
        lerp(xRange * 0.1, xRange * 0.8, sectionP),
        y + ySpaceSection * 1.4 * noise,
        // End point
        xEnd,
        y
      )

      ctx.stroke()
      ctx.restore()
    }
  }
}

export const sketch = sketch002
