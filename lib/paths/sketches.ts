/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'

import { SketchSettings } from 'types/sketches'

const sketchDir = path.join(process.cwd(), 'pages/sketches')
const sketchFiles = fs
  .readdirSync(sketchDir)
  .filter((fn) => fn !== 'index.tsx')
  .map((filename) => filename.replace('.tsx', ''))

export const sketchIds = (): string[] => {
  const ids = sketchFiles.map((fileName) => fileName.replace('.tsx', ''))

  return ids
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
const sketchSettings = (fileName: string): SketchSettings => {
  try {
    const sketch: Sketch = require(`../../pages/sketches/${fileName}`)
    return sketch.settings
  } catch (error) {
    // Build-time error.
    console.error(error)
  }
}
