import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'
import type { GetStaticProps, NextPage } from 'next'
import palettes from 'nice-color-palettes/200.json'
import type {
  SketchFn,
  SketchInitialProps,
  SketchSettings,
} from 'types/sketches'

import { Sketch } from 'layouts/Sketch'
import { getSketchProps } from 'lib/sketchProps'

const random = Random.createRandom()

export const settings: SketchSettings = {
  id: '001',
  title: 'Noise grid',
  initialSeed: '14168',
}

const count = 20
const sketch: SketchFn = ({ ctx, size }) => {
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
