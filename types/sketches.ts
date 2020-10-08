import { Random } from 'canvas-sketch-util/random'

export interface SketchAsset {
  src: string
  credit: {
    id: string
    owner: string
  }
}

/** Random runtime variables, exposed to React */
export interface SketchRandomVars {
  asset?: SketchAsset
}

export type SketchFn = (options: {
  ctx: CanvasRenderingContext2D
  expose: (vars: SketchRandomVars) => void
  size: number
  random: Random
}) => void

export interface SketchSettings {
  id: string
  title: string
  initialSeed: string
  images?: SketchAsset[]
}

export type SketchInitialProps = SketchSettings & {
  next?: string
  prev?: string
}
