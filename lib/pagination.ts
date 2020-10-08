import { SketchInitialProps } from 'types/sketches'

import { sketchIds } from './paths/sketches'

type PaginationProps = Pick<SketchInitialProps, 'next' | 'prev'>

export const getSketchPagination = (pageId: string): PaginationProps => {
  const ids = sketchIds()
  const currentIndex = ids.findIndex((id) => id === pageId)
  const next = ids[currentIndex + 1] || null
  const prev = ids[currentIndex - 1] || null

  return {
    next,
    prev,
  }
}
