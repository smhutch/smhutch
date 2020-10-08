interface ImageSetting {
  src: string
  credit: {
    id: string
    owner: string
  }
}

export type SketchFn = (options: {
  ctx: CanvasRenderingContext2D
  size: number
}) => void

export interface SketchSettings {
  id: string
  title: string
  initialSeed: string
  images?: ImageSetting[]
}

export type SketchInitialProps = {
  next: string
  prev: string
}
