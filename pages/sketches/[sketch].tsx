import { sketchIds, sketchSettings } from 'build/sketches'
import { createRandom } from 'lib/random'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Sketch } from 'layouts/Sketch'
import { getSketchPagination } from 'lib/pagination'
import type { SketchInitialProps } from 'types/sketches'

const random = createRandom()

const SketchRoute: NextPage<SketchInitialProps> = (props) => {
  return <Sketch mode="app" random={random} {...props} />
}

type Params = {
  sketch: string
}

export const getStaticProps: GetStaticProps<
  SketchInitialProps,
  Params
> = async ({ params }) => {
  if (!params) throw new Error('No params')

  const sketchId = params.sketch
  const settings = await sketchSettings(sketchId)
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

export default SketchRoute
