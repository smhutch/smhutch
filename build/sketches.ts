/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'

import { SketchSettings } from 'types/sketches'

const sketchDir = path.join(process.cwd(), '/sketches')
const sketchFiles = fs
  .readdirSync(sketchDir)
  .map((filename) => filename.replace('.ts', ''))

export const sketchIds = (): string[] => {
  return sketchFiles
}

type SketchIndex = Pick<SketchSettings, 'id' | 'initialSeed' | 'title'>
export const sketchIndex = (): SketchIndex[] => {
  const index = sketchFiles
    .map(
      (fileName): SketchIndex => {
        const { initialSeed, title } = sketchSettings(fileName)

        return {
          id: fileName.replace('.js', ''),
          initialSeed,
          title,
        }
      }
    )
    .reverse()

  return index
}

type Sketch = {
  settings: SketchSettings
}
export const sketchSettings = (fileName: string): SketchSettings => {
  try {
    const sketch: Sketch = require(`../sketches/${fileName}`)
    return sketch.settings
  } catch (error) {
    // Build-time error.
    console.error(error)
  }
}
