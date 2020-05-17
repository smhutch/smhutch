import fs from 'fs'
import path from 'path'

const sketchDir = path.join(process.cwd(), 'sketches')
const sketchFiles = fs.readdirSync(sketchDir)

export const sketchIds = () => {
  const ids = sketchFiles.map((fileName) => fileName.replace('.js', ''))

  return ids
}

// Returns all id's and settings.
export const sketchIndex = () => {
  const index = sketchFiles.map((fileName) => {
    const { title } = sketchSettings(fileName)

    return {
      id: fileName.replace('.js', ''),
      title: title,
    }
  })

  return index
}

export const sketchSettings = (fileName) => {
  const { settings } = require(`../sketches/${fileName}`)
  return settings
}
