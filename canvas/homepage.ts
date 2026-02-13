import { lerp } from '@/utils/math'
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
    config: { type: 'lines' } & LinesConfig
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

  const LINE_SPACING = 20
  const SEGMENT_LENGTH = 20
  const BASE_GAP = 0
  const GAP_VARIATION = 12 // How much gap changes based on mouse X
  const CURSOR_INFLUENCE_RADIUS = width / 4

  ctx.fillStyle = isDarkMode ? 'black' : 'white'
  ctx.strokeStyle = isDarkMode ? 'white' : 'black'
  ctx.lineCap = 'round'
  ctx.lineWidth = 0.5

  const colCount = Math.floor(width / LINE_SPACING)

  for (let col = 0; col <= colCount; col++) {
    const x = col * LINE_SPACING

    // Calculate gap based on X proximity to mouse
    const distToMouseX = Math.abs(x - mouse.elX)
    const xProximity = Math.max(0, 1 - distToMouseX / (width * 0.2))
    const gap = BASE_GAP + xProximity * GAP_VARIATION

    let currentY = 0

    while (currentY < height) {
      const segmentEnd = Math.min(currentY + SEGMENT_LENGTH, height)
      const segmentMidY = (currentY + segmentEnd) / 2

      // Calculate 2D distance from cursor to segment
      const dx = x - mouse.elX
      const dy = segmentMidY - mouse.elY
      const distToCursor = Math.sqrt(dx * dx + dy * dy)
      const proximity = Math.max(0, 1 - distToCursor / CURSOR_INFLUENCE_RADIUS)

      // Darker when closer to cursor
      const lineAlpha = lerp(0.15, 0.8, proximity)

      // Draw segment
      ctx.globalAlpha = lineAlpha * alpha.get()
      ctx.beginPath()
      ctx.moveTo(x, currentY)
      ctx.lineTo(x, segmentEnd)
      ctx.stroke()

      // Move to next segment (current position + segment length + gap)
      currentY = segmentEnd + gap
    }
  }
}
