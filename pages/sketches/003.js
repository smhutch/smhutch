import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'

import { Credit } from 'components/Credit'
import { Sketch } from 'layouts/Sketch'

const random = Random.createRandom()

export const settings = {
  id: '003',
  title: 'Photo grid',
  initialSeed: '764883',
  images: [
    {
      src: '/open/surf.jpg',
      credit: {
        id: 'cmt3JdS5MC4',
        owner: 'Jeremy Bishop',
      },
    },
    {
      src: '/open/pier.jpg',
      credit: {
        id: 'VBBGigIuaDY',
        owner: 'Sherman Yang',
      },
    },
    {
      src: '/open/tokyo.jpg',
      credit: {
        id: '71l9zO0RBEM',
        owner: 'Aleksandar Langer',
      },
    },
    {
      src: '/open/porsche.jpg',
      credit: {
        id: 'znzlxOfFbWs',
        owner: 'Eric Saunders',
      },
    },
    {
      src: '/open/skate.jpg',
      credit: {
        id: 'ISkeH2SLqNU',
        owner: 'Robson Hatsukami Morgan',
      },
    },
    {
      src: '/open/plane.jpg',
      credit: {
        id: 'rGVxtVVtv7E',
        owner: 'Joshua Sortino',
      },
    },
  ],
}

let asset = random.pick(settings.images)

function sketch({ ctx, size }) {
  asset = random.pick(settings.images)

  const grid = 5
  const square = size / grid

  const crops = []
  for (let col = 0; col < grid; col++) {
    for (let row = 0; row < grid; row++) {
      const px = row / (grid - 1)
      const py = col / (grid - 1)

      crops.push({
        x: lerp(0, size - square, px),
        y: lerp(0, size - square, py),
      })
    }
  }

  const places = random.shuffle(crops)

  const image = new Image()
  image.onload = () => {
    crops.forEach((crop, i) => {
      const place = places[i]
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        square,
        square,
        place.x,
        place.y,
        square,
        square
      )
    })
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
