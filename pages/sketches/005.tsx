import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import { GetStaticProps, NextPage } from 'next'
import { SketchFn, SketchInitialProps, SketchSettings } from 'types/sketches'

import { Sketch } from 'layouts/Sketch'
import { getSketchProps } from 'lib/sketchProps'

const random = Random.createRandom()

export const settings: SketchSettings = {
  id: '005',
  title: 'Noise wave',
  initialSeed: '450581',
}

const sketch: SketchFn = ({ ctx, size }) => {
  ctx.fillStyle = 'white'
  const lines = random.range(50, 150)
  const steps = 100
  const marginX = size * 0.1
  const marginY = size * 0.2
  for (let line = 0; line < lines; line++) {
    const p = line / (lines - 1)
    const startX = marginX
    const endX = size - marginX
    const y = lerp(marginY, size - marginY, p)
    ctx.beginPath()
    for (let step = 0; step < steps; step++) {
      const stepP = step / (steps - 1)
      const n = random.noise2D(stepP, p)
      const lineX = lerp(startX, endX, stepP)
      const lineY = y + (marginY / 4) * Math.cos(Math.PI * n)
      ctx.lineTo(lineX, lineY)
    }
    ctx.stroke()
  }
  ctx.restore()
}

const props = {
  ...settings,
  random,
  sketch,
}

export const getStaticProps: GetStaticProps<SketchInitialProps> = async () => {
  return getSketchProps(settings.id)
}

const UI: NextPage<SketchInitialProps> = (initialProps) => {
  return <Sketch {...props} {...initialProps} />
}

export default UI
