import { lerp } from 'lib/math'
import { createRandom } from 'lib/random'
import type { NextApiRequest, NextApiResponse } from 'next'

// Viewbox
const size = 100

export default (_: NextApiRequest, res: NextApiResponse): void => {
  const random = createRandom()
  const grid = random.range(40, 60)
  const baseBoxSize = size / grid

  const boxes = []
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      const rowP = row / (grid - 1)
      const colP = col / (grid - 1)
      const noise = random.noise2D(rowP, colP)

      const boxSize = baseBoxSize * 0.5 + baseBoxSize * noise * 0.75

      // minus 1 to keep within SVG boundaries.
      const x = lerp(0, size - boxSize - 1, rowP)
      const y = lerp(0, size - boxSize - 1, colP)

      const el = `
        <rect width="${boxSize}" height="${boxSize}" x="${x}" y="${y}" />
      `

      boxes.push(el)
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    ${boxes.join()}
    </svg>
  `

  res.setHeader('Content-Type', 'image/svg+xml')
  res.status(200).send(svg)
}
