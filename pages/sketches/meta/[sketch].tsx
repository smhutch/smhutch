import { Sketch } from 'layouts/Sketch'
import { createRandom } from 'lib/random'
import type { NextPage } from 'next'
import type { SketchInitialProps } from 'types/sketches'

const random = createRandom()

const MetaSketchRoute: NextPage<SketchInitialProps> = (props) => {
  return <Sketch mode="meta" random={random} {...props} />
}

export default MetaSketchRoute

export { getStaticPaths, getStaticProps } from '../[sketch]'
