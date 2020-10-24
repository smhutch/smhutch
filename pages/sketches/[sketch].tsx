import { sketchIds, sketchSettings } from 'build/sketches'
import { createRandom } from 'canvas-sketch-util/random'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'


import { Sketch } from 'layouts/Sketch'
import { getSketchPagination } from 'lib/pagination'
import type { SketchInitialProps } from 'types/sketches'

const random = createRandom()

const UI: NextPage<SketchInitialProps> = (props) => {
  return <Sketch random={random} {...props} />
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
