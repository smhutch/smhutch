import { lerp } from 'canvas-sketch-util/math'

import type { SketchFn, SketchSettings } from 'types/sketches'

export const settings: SketchSettings = {
  id: '003',
  title: 'Photo grid',
  initialSeed: '887280',
  images: [
    {
      src: '/open/surf.jpg',
      credit: {
        id: 'cmt3JdS5MC4',
        owner: 'Jeremy Bishop',
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
      src: '/open/plane.jpg',
      credit: {
        id: 'rGVxtVVtv7E',
        owner: 'Joshua Sortino',
      },
    },
    {
      src: '/open/wave.jpg',
      credit: {
        id: 'UD5drKd4H6w',
        owner: 'Ricardo Gomez Angel',
      },
    },
    {
      src: '/open/pipe.jpg',
      credit: {
        id: 'oDSWuj1YS00',
        owner: 'Pipe A.',
      },
    },
    {
      src: '/open/stairs.jpg',
      credit: {
        id: 'wgMzQo-v474',
        owner: 'Tom Byrom',
      },
    },
  ],
}

export const sketch003: SketchFn = ({ expose, ctx, size, random }) => {
  const asset = random.pick(settings.images || [])

  const grid = random.rangeFloor(4, 12)

  const image = new Image()
  image.onload = (event) => {
    const image = event.target as HTMLImageElement

    const imageSize = Math.max(image.width, image.height)

    const sourceSquare = imageSize / grid
    const canvasSquare = size / grid

    const crops: Array<{
      /** source position on x axis */
      sx: number
      /** source position on y axis */
      sy: number
      /** destination position on x axis */
      dx: number
      /** destination position on y axis */
      dy: number
    }> = []
    for (let col = 0; col < grid; col++) {
      for (let row = 0; row < grid; row++) {
        const px = row / (grid - 1)
        const py = col / (grid - 1)

        crops.push({
          sx: lerp(0, image.width - sourceSquare, px),
          sy: lerp(0, image.height - sourceSquare, py),
          dx: lerp(0, size - canvasSquare, px),
          dy: lerp(0, size - canvasSquare, py),
        })
      }
    }

    const places = random.shuffle(crops)

    crops.forEach((crop, i) => {
      const place = places[i]
      ctx.drawImage(
        image,
        crop.sx,
        crop.sy,
        sourceSquare,
        sourceSquare,
        place.dx, // TODO: use place instead
        place.dy, // TODO: use place instead
        canvasSquare,
        canvasSquare
      )
    })
  }

  image.src = asset.src

  if (expose) {
    expose({
      asset,
    })
  }
}

export const sketch = sketch003
