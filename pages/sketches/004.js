import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'

import { Sketch } from 'layouts/Sketch'

const random = Random.createRandom()

export const settings = {
  id: '004',
  title: 'Convergence',
  initialSeed: '764883',
}

function sketch({ ctx, size }) {
  ctx.fillStyle = 'white'
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.4

  ctx.translate(size / 2, size / 2)
  ctx.rotate(random.range(0, Math.PI * 2))
  ctx.translate(-size / 2, -size / 2)

  const center = size / 2
  const limit = size / 4
  const offset = {
    x: random.range(-limit, limit),
    y: random.range(-limit, limit),
  }
  const count = random.range(60, 120)

  Array.from({ length: count }).forEach((_, index, array) => {
    const p = index / (array.length - 1)
    const noise = random.noise1D(p)

    const angle = lerp(Math.PI, 0, p) * noise

    const radius = lerp(size / 3, 5, p)
    const x = center + noise * offset.x
    const y = center + noise * offset.y
    const startAngle = Math.PI + angle
    const endAngle = Math.PI * 2 + angle

    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  })

  ctx.restore()
}

const props = {
  ...settings,
  random,
  sketch,
}

export async function getStaticProps() {
  const { getSketchProps } = require('lib/sketchProps')
  return await getSketchProps(settings.id)
}

export default function UI(initialProps) {
  return <Sketch {...props} {...initialProps} />
}