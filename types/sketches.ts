import type { Random } from 'canvas-sketch-util/random'

export type SketchAsset = {
  src: string
  credit: {
    id: string
    owner: string
  }
}

/** Random runtime variables, exposed to React */
export type SketchRandomVars = {
  asset?: SketchAsset
}

export type SketchFn = (options: {
  ctx: CanvasRenderingContext2D
  expose?: (vars: SketchRandomVars) => void
  size: number
  random: Random
}) => void

export type SketchSettings = {
  id: string
  title: string
  initialSeed: number
  images?: SketchAsset[]
}

export type SketchInitialProps = SketchSettings & {
  next?: string | null
  prev?: string | null
}

export type Axes = {
  x: number
  y: number
}

export type XY = [x: number, y: number]
