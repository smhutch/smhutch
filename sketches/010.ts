import { lerp } from 'canvas-sketch-util/math'
import {
  getInvertedNormalDistribution,
  getNormalDistribution,
} from 'lib/canvas'

import { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '010',
  title: 'Merge',
  initialSeed: '41029',
}

const sketch010: SketchFn = ({ ctx, size, random }) => {
  ctx.fillStyle = 'white'
  const maxTriSize = size * 0.35
  const maxOffset = size * 0.3
  const margin = size * 0.1
  const boxSize = size - margin * 2
  const internalBoxSize = boxSize * 0.2

  const linesPerSide = 40
  const dashesPerLine = 5

  const maxRotation = random.range(0.01, 0.8)

  const col1 = 'white'
  const col2 = 'black'

  const edges = {
    top: margin,
    right: boxSize,
    bottom: boxSize,
    left: margin,
  }

  const opacitySeed = Math.abs(random.value())
  const topSeed = random.value()
  const leftSeed = random.value()
  const rightSeed = random.value()
  const bottomSeed = random.value()

  console.log(bottomSeed)

  Array.from({ length: linesPerSide }).forEach((_, line) => {
    const pLine = line / (linesPerSide - 1)

    Array.from({ length: dashesPerLine }).forEach((_, dash) => {
      const pDash = dash / (dashesPerLine - 1)
      const n = getNormalDistribution(pLine)

      const getNoise = (seed) => random.noise3D(pLine, pDash, seed)
      const getLerpNoise = (seed) => lerp(getNoise(seed) * 2, 1, n)

      const noiseTop = random.noise2D(pLine, pDash)
      const noiseOffset = lerp(noiseTop, 1, n)

      const topNoise = getLerpNoise(topSeed)
      //const topNoise = getLerpNoise(topSeed)
      //const topNoise = getLerpNoise(topSeed)
      //const topNoise = getLerpNoise(topSeed)

      ctx.globalAlpha = lerp(1, 0.1, getLerpNoise(opacitySeed))

      // Top
      ctx.beginPath()
      ctx.lineTo(lerp(margin, size - margin, pLine), margin)
      // ctx.translate(size / 2, size / 2)
      // ctx.rotate(lerp(0, 0.001, topNoise))
      // ctx.translate(-size / 2, -size / 2)
      ctx.lineTo(
        lerp(
          margin + internalBoxSize * topNoise,
          size - margin - internalBoxSize * topNoise,
          pLine
        ),
        margin + internalBoxSize * Math.abs(topNoise)
      )
      ctx.stroke()

      // Bottom
      ctx.beginPath()
      ctx.lineTo(lerp(margin, size - margin, pLine), size - margin)
      ctx.lineTo(
        lerp(margin + internalBoxSize, size - margin - internalBoxSize, pLine),
        size - margin - internalBoxSize * getLerpNoise(bottomSeed)
      )
      ctx.stroke()

      // Left
      ctx.beginPath()
      ctx.lineTo(margin, lerp(margin, size - margin, pLine))
      ctx.lineTo(
        margin + internalBoxSize,
        lerp(margin + internalBoxSize, size - margin - internalBoxSize, pLine)
      )
      ctx.stroke()

      // Right
      ctx.beginPath()
      ctx.lineTo(size - margin, lerp(margin, size - margin, pLine))
      ctx.lineTo(
        size - margin - internalBoxSize,
        lerp(margin + internalBoxSize, size - margin - internalBoxSize, pLine)
      )
      ctx.stroke()
    })
  })

  ctx.restore()
}

export const sketch = sketch010
