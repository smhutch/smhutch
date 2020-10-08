import { createRandom } from 'canvas-sketch-util/random'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import type { SketchFn, SketchInitialProps } from 'types/sketches'

import { Sketch } from 'layouts/Sketch'
import { getSketchPagination } from 'lib/pagination'
import { sketchIds, sketchSettings } from 'lib/paths/sketches'

const random = createRandom()

// Using an in-memory cache allows us to optimise runtime imports.
// Only importing the modules required by each page.
const cache: Record<string, SketchFn> = {}

const UI: NextPage<SketchInitialProps> = (props) => {
  useEffect(() => {
    if (cache[props.id]) return
    const getSketch = async () => {
      const mod = await import(`../../sketches/${props.id}`)
      cache[props.id] = mod.sketch
    }

    getSketch()
  }, [props.id])

  return <Sketch random={random} sketch={cache[props.id]} {...props} />
}

type Params = {
  sketch: string
}

export const getStaticProps: GetStaticProps<
  SketchInitialProps,
  Params
> = async ({ params }) => {
  const sketchId = params.sketch
  const settings = sketchSettings(sketchId)
  const paginationProps = getSketchPagination(sketchId)

  return {
    props: {
      ...settings,
      ...paginationProps,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = sketchIds()

  return {
    paths: ids.map((id) => ({
      params: {
        sketch: id,
      },
    })),
    fallback: false,
  }
}

export default UI
