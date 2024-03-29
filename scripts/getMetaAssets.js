import fs from 'fs'
import path from 'path'

import puppeteer from 'puppeteer'

const sketchDir = path.join(process.cwd(), '/sketches')

const sketchFiles = fs
  .readdirSync(sketchDir)
  .map((filename) => filename.replace('.ts', ''))

const getSketchImages = async () => {
  const ids = sketchFiles
  const publicSketchAssets = path.join(process.cwd(), 'public/sketches')

  const idsToGenerate = ids.filter((id) => {
    const needsPreview = !fs.existsSync(
      `${publicSketchAssets}/${id}/preview.png`
    )
    return needsPreview
  })

  // Only proceed if assets have not already been generated.
  if (!idsToGenerate.length) {
    console.log('No assets need generated.')
    return
  }

  const getImages = async (ids) => {
    // use headless: false to debug.
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    // Sized for OG meta images.
    await page.setViewport({
      width: 1200,
      height: 630,
    })

    for (const id of ids) {
      const outDir = `public/sketches/${id}`

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
      }

      // Go to meta page
      await page.goto(`http://localhost:5000/sketches/${id}?pupeteer=true`)

      // Screenshot entire page, for meta image
      await page.screenshot({ path: `${outDir}/meta.png` })

      const canvas = await page.$('canvas')
      await canvas.screenshot({ path: `${outDir}/preview.png` })

      console.log(`${id} — Assets created.`)
    }

    await browser.close()
  }

  await getImages(idsToGenerate)
}

getSketchImages()
