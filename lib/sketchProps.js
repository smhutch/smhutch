import { sketchIds } from './paths/sketches'

export const getSketchProps = async pageId => {
  const ids = await sketchIds()
  const currentIndex = ids.findIndex(id => id === pageId)
  const next = ids[currentIndex + 1] || null
  const prev = ids[currentIndex - 1] || null

  return {
    props: {
      next,
      prev,
    },
  }
}
