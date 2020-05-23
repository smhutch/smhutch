import Link from 'next/link'

import { Stack } from 'components/Stack'
import { Text } from 'components/Text'
import { sketchIndex } from 'lib/paths'

const Sketches = ({ sketches }) => {
  return (
    <>
      <main>
        <div className="container py4">
          <Text className="mb4" el="h1">
            Sketches
          </Text>
          <Stack el="ul">
            {sketches.map((sketch) => (
              <li key={sketch.id}>
                <Link as={`/sketches/${sketch.id}`} href="/sketches/[id]">
                  <a>
                    {sketch.id}. {sketch.title}
                  </a>
                </Link>
              </li>
            ))}
          </Stack>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const sketches = await sketchIndex()

  return {
    props: {
      sketches,
    },
  }
}

export default Sketches
