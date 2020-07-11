import fs from 'fs'
import path from 'path'

const sketchDir = path.join(process.cwd(), 'pages/sketches')
const sketchFiles = fs.readdirSync(sketchDir).filter((fn) => {
  return fn !== 'index.js'
})

export const sketchIds = () => {
  const ids = sketchFiles.map((fileName) => fileName.replace('.js', ''))

  return ids
}

// Returns all id's and settings.
export const sketchIndex = () => {
  const index = sketchFiles
    .map((fileName) => {
      const { initialSeed, title } = sketchSettings(fileName)

      return {
        id: fileName.replace('.js', ''),
        initialSeed,
        title,
      }
    })
    .reverse()

  return index
}

export const sketchSettings = (fileName) => {
  const { settings } = require(`../../pages/sketches/${fileName}`)
  return settings
}
