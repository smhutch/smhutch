import { getP, lerp } from '@/utils/math'
import type { MotionValue } from 'motion'
import type { State as MouseState } from 'react-use/lib/useMouse'
import { match } from 'ts-pattern'

type BaseConfig = {
  alpha: MotionValue<number> // 0...1
  isOver: MotionValue<number> // 0...1
  ctx: CanvasRenderingContext2D
  isDarkMode: boolean
  mouse: MouseState
}

type InternalState = {
  width: number
  height: number
}

type BaseHandlerOptions = InternalState & BaseConfig

export const homepageCanvas = (
  options: BaseConfig & {
    canvas: HTMLCanvasElement
    config: { type: 'lines' }
  }
) => {
  const { config, canvas, ctx } = options

  const { height, width } = canvas.getBoundingClientRect()

  const SCALE = window.devicePixelRatio

  canvas.width = width * SCALE
  canvas.height = height * SCALE

  ctx.scale(SCALE, SCALE)

  ctx.globalAlpha = 1
  ctx.fillStyle = 'transparent'
  ctx.fillRect(0, 0, width, height)

  const baseHandlerOptions = {
    ...options,
    width,
    height,
  }

  match(config)
    .with({ type: 'lines' }, () => {
      homepageLines2(baseHandlerOptions)
    })
    .exhaustive()
}

export const homepageLines = (options: BaseHandlerOptions) => {
  const { alpha, ctx, isDarkMode, isOver, width, height, mouse } = options

  const GAP = 12

  ctx.fillStyle = isDarkMode ? 'black' : 'white'
  ctx.strokeStyle = isDarkMode ? 'white' : 'black'
  ctx.lineCap = 'round'

  const colCount = Math.floor(width / GAP)

  const mouseRangeWidth = width * 0.15
  const mouseRangeMin = mouse.elX - mouseRangeWidth
  const mouseRangeMax = mouse.elX + mouseRangeWidth

  for (let col = 0; col < colCount; col++) {
    // Percentage through columns
    const p = col / (colCount - 1)
    const centerDiff = Math.abs((p - 0.5) * 2)
    const centerP = lerp(1, 0, centerDiff)
    const x = lerp(-1, width + 1, p)

    const xWeight =
      x > mouseRangeMin && x < mouseRangeMax
        ? lerp(1, 0, Math.abs(x - mouse.elX) / mouseRangeWidth)
        : 0

    const xMovementWeight = lerp(-0.15, 0.15, isOver.get())
    const xMovementAmount = width * xMovementWeight

    const mouseAlpha = lerp(0.1, 0.8, xWeight)

    ctx.globalAlpha = mouseAlpha * alpha.get()
    ctx.lineWidth = lerp(0.4, 1, xWeight)

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, 0)

    ctx.bezierCurveTo(
      lerp(x, x + xMovementAmount, centerP),
      height * 0.33,
      lerp(x, x - xMovementAmount, centerP),
      height * 0.66,
      x,
      height
    )
    ctx.stroke()
    ctx.restore()
  }
}

export const homepageLines2 = (options: BaseHandlerOptions) => {
  const { alpha, ctx, isDarkMode, width, height, mouse } = options

  const LINE_WIDTH = 1
  const SIDE_INSET = 12
  const DIR_INSET = SIDE_INSET * 2
  const DEBUG = false

  // const yLength = boxHeight * 0.2

  ctx.fillStyle = isDarkMode ? 'black' : 'white'
  ctx.strokeStyle = isDarkMode ? 'white' : 'black'
  // ctx.lineCap = 'round'
  ctx.lineWidth = LINE_WIDTH

  // Uniform density - maintains consistent spacing and naturally reflects aspect ratio
  const density = 0.03 // items per pixel
  const colCount = width * density
  const rowCount = height * density

  const boxHeight = height - DIR_INSET

  if (DEBUG) {
    ctx.rect(SIDE_INSET, SIDE_INSET, width - DIR_INSET, height - DIR_INSET)
    ctx.globalAlpha = 0.1
    ctx.stroke()
  }

  for (let col = 0; col <= colCount; col++) {
    const px = getP({ current: col, max: colCount })
    const x = lerp(SIDE_INSET, width - SIDE_INSET, px)

    for (let row = 0; row <= rowCount; row++) {
      const py = getP({ current: row, max: rowCount })
      const y = lerp(SIDE_INSET, height - SIDE_INSET, py)

      // Calculate distance from cursor
      const yDist = Math.abs(y - mouse.elY)
      const yProximity = Math.max(0, 1 - yDist / (height * 0.4))

      const xDist = Math.abs(x - mouse.elX)
      const xProximity = Math.max(0, 1 - xDist / (width * 0.5))

      const pp = yProximity * xProximity

      // Opacity increases when closer to mouse
      const lineAlpha = lerp(0.2, 0.7, pp)

      // Calculate angle from line position to cursor
      const dx = mouse.elX - x
      const dy = mouse.elY - y
      const angle = Math.atan2(dy, dx)
      const distanceToCursor = Math.sqrt(dx * dx + dy * dy)

      // Calculate spacing constraints
      const ySpacing = boxHeight / rowCount
      const xSpacing = (width - DIR_INSET) / colCount

      // Constrain max length based on angle to prevent overlap
      // When horizontal (cos=1), use xSpacing; when vertical (sin=1), use ySpacing
      const horizontalness = Math.abs(Math.cos(angle))
      const verticalness = Math.abs(Math.sin(angle))
      const maxLength = xSpacing * horizontalness + ySpacing * verticalness

      // Line length based on proximity
      const baseLineLength = lerp(maxLength * 0.2, maxLength * 0.8, pp)

      // Keep lines from reaching the cursor - maintain a clear zone
      const clearZone = 18 // pixels of clear space around cursor
      const lineLength = Math.min(
        baseLineLength,
        Math.max(0, distanceToCursor - clearZone)
      )

      // Calculate end point based on angle
      const endX = x + Math.cos(angle) * lineLength
      const endY = y + Math.sin(angle) * lineLength

      ctx.globalAlpha = lineAlpha * alpha.get()
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
  }
}
