import fs from 'fs'
import path from 'path'

import puppeteer from 'puppeteer'

import { sketchIds } from '../lib/paths'


const getSketchImages = async () => {
  const ids = await sketchIds()
  const publicSketchAssets = path.join(process.cwd(), 'public/sketches')
  const existingAssets = await fs.readdirSync(publicSketchAssets)
  const idsToGenerate = ids.filter(id => !existingAssets.includes(id))

  // Only proceed if assets have not already been generated.
  if (!idsToGenerate.length) {
    console.log('No assets need generated.')
  }

  // Launch headless
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // Sized for OG meta images.
  await page.setViewport({
    width: 1200,
    height: 630,
  })

  const getImages = async (ids) => {
    for (const id of ids) {
      const outDir = `public/sketches/${id}`

      // Create new directory for images
      await fs.mkdirSync(outDir)

      // Go to meta page
      await page.goto(`http://localhost:3000/sketches/meta/${id}`)

      // Screenshot entire page, for meta image
      await page.screenshot({ path: `${outDir}/meta.png` })

      const canvas = await page.$('canvas')
      await canvas.screenshot({ path: `${outDir}/preview.png` })

      console.log(`${id} — Assets created.`)
    }
  }

  await getImages(idsToGenerate)
  await browser.close()
}

getSketchImages()
