import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'

import { Credit } from 'components/Credit'
import { Sketch } from 'layouts/Sketch'

const random = Random.createRandom()

export const settings = {
  id: '006',
  title: 'Distort',
  initialSeed: '560480',
  images: [
    {
      src: '/open/cubic.jpg',
      credit: {
        id: 'VBBGigIuaDY',
        owner: 'Sherman Yang',
      },
    },
    {
      src: '/open/vert.jpg',
      credit: {
        id: 'L6SDVDPHSh4',
        owner: 'Geoffroy Hauwen',
      },
    },
    {
      src: '/open/surf-far.jpg',
      credit: {
        id: 'b_wcdJKZw0A',
        owner: 'Jeremy Bishop',
      },
    },
    {
      src: '/open/patterned.jpg',
      credit: {
        id: '9AdeEdYB2yk',
        owner: 'Ricardo Gomez Angel',
      },
    },
    {
      src: '/open/underwater.jpg',
      credit: {
        id: 'Cp-LUHPRpWM',
        owner: 'Christopher Campbell',
      },
    },
  ],
}

let asset = random.pick(settings.images)

function sketch({ ctx, size }) {
  asset = random.pick(settings.images)
  const margin = size * 0.2
  const image = new Image()

  image.onload = () => {
    const start = margin
    const end = size - margin * 2
    const grid = end - start

    ctx.save()
    ctx.drawImage(image, start, start, end, end)

    for (let x = 0; x < grid; x++) {
      const px = x / (grid - 1)
      for (let y = 0; y < grid; y++) {
        if (random.chance(0.2)) {
          const py = y / (grid - 1)
          const noise = random.noise2D(px, py)

          const pixelX = lerp(start, start + end - 1, px)
          const pixelY = lerp(start, start + end - 1, py)

          const [r, g, b] = ctx.getImageData(pixelX, pixelY, 1, 1).data
          const width = Math.cos(Math.PI * 2 * px) * noise * random.gaussian(50)
          const height = lerp(1, 2, Math.abs(Math.abs(py - 0.5) - 0.5))

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(
            Math.min(pixelX + width, pixelX),
            Math.min(pixelY + height, pixelY),
            width,
            height
          )
          ctx.restore()
        }
      }
    }
  }

  image.src = asset.src
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
  return (
    <Sketch extra={<Credit {...asset.credit} />} {...props} {...initialProps} />
  )
}
