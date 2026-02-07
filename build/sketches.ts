import fs from 'node:fs'
import path from 'node:path'

import type { SketchSettings } from 'types/sketches'

const sketchDir = path.join(process.cwd(), '/sketches')
const sketchFiles = fs
  .readdirSync(sketchDir)
  .filter((filename) => !filename.endsWith('index.ts'))
  .map((filename) => filename.replace('.ts', ''))

export const sketchIds = (): string[] => {
  return sketchFiles
}

type SketchIndex = Pick<SketchSettings, 'id' | 'initialSeed' | 'title'>

export const sketchIndex = async (): Promise<SketchIndex[]> => {
  const sketches = await Promise.all(
    sketchFiles.map(async (fileName) => {
      const { initialSeed, title, id } = await sketchSettings(fileName)
      return {
        id: id ?? fileName.replace('.js', ''),
        initialSeed,
        title,
      }
    })
  )
  return sketches.reverse()
}

type Sketch = {
  settings: SketchSettings
}

export const sketchSettings = async (
  fileName: string
): Promise<SketchSettings> => {
  try {
    // Use dynamic import for async behavior instead of require
    const sketch: Sketch = await import(`../sketches/${fileName}`)
    return sketch.settings
  } catch (_error) {
    throw new Error(`Could not find sketch settings for ${fileName}`)
  }
}
