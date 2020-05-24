import { lerp } from 'canvas-sketch-util/math'
import Random from 'canvas-sketch-util/random'

import { Sketch } from 'layouts/Sketch'

const random = Random.createRandom()

export const settings = {
  id: '003',
  title: 'Photo grid',
  initialSeed: '764883',
  data: {
    images: [
      {
        src: '/sketches/003/images/surf.jpg',
        credit: {
          id: 'cmt3JdS5MC4',
          owner: 'Jeremy Bishop',
          site: 'unsplash'
        }
      }
    ]
  }
}

function sketch({ ctx, size }) {
  const asset = random.pick(settings.data.images)

  ctx.globalAlpha = 1
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, size, size)

  const grid = 5
  const square = size / grid

  const crops = []
  for (let col = 0; col < grid; col++) {
    for (let row = 0; row < grid; row++) {
      const px = row / (grid - 1)
      const py = col / (grid - 1)

      crops.push({
        x: lerp(0, size - square, px),
        y: lerp(0, size - square, py)
      })
    }
  }
  
  const places = random.shuffle(crops)

  const image = new Image()
  image.onload = () => {
    crops.forEach((crop, i) => {
      const place = places[i]
      ctx.drawImage(image, crop.x, crop.y, square, square, place.x, place.y, square, square);
    }) 
  }

  image.src = asset.src
}

const props = {
  ...settings,
  random,
  sketch
}

export async function getStaticProps() {
  const { getSketchProps } = require('lib/sketchProps')
  return await getSketchProps(settings.id)
}

export default function UI(initialProps) {
  return <Sketch {...props} {...initialProps} />
}