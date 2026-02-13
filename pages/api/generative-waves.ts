import { createRandom } from 'lib/random'
import type { NextApiRequest, NextApiResponse } from 'next'
import { lerp } from 'utils/math'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const random = createRandom()
  const w = req.query.w ? Number(req.query.w) : 1000
  const h = req.query.h ? Number(req.query.h) : 1000
  const padX = req.query.padX ? Number(req.query.padX) : -0.1
  const padY = req.query.padY ? Number(req.query.padY) : -0.1

  const toMinMax = (limit: number, padding: number) => {
    const offset = limit * padding
    const min = 0 + offset
    const max = limit - offset
    return [min, max]
  }

  const [minW, maxW] = toMinMax(w, padX)
  const [minH, maxH] = toMinMax(h, padY)

  const lineCount = Math.floor(h * 0.05)

  const lines = []
  for (let line = 0; line < lineCount; line++) {
    const lineP = line / (lineCount - 1)
    const y = lerp(minH, maxH, lineP)
    const dotCount = Math.floor(w * 0.05)

    for (let dot = 0; dot < dotCount; dot++) {
      const dotP = dot / (dotCount - 1)
      const dotX = lerp(minW, maxW, dotP)
      const noise = random.noise2D(lineP, dotP, 2)

      const el = `
        <circle
          cx="${dotX}"
          cy="${y}"
          r="${lerp(w * 0.02, 1, lineP) * lerp(1, noise, dotP)}"
          stroke="#333"
          stroke-width="1"
          fill="#fff"
        />
      `

      lines.push(el)
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
      ${lines.join()}
    </svg>
  `

  res.setHeader('Content-Type', 'image/svg+xml')
  res.status(200).send(svg)
}
