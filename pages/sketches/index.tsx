import { GetStaticProps } from 'next'
import Link from 'next/link'
import { SketchSettings } from 'types/sketches'

import { Text } from 'components/Text'
import { sketchIndex } from 'lib/paths/sketches'

interface Props {
  sketches: SketchSettings[]
}

const Sketches: React.FC<Props> = ({ sketches }) => {
  return (
    <>
      <main>
        <div className="container py4">
          <Text className="mb4" el="h1">
            Sketches
          </Text>
          <ul className="reset">
            {sketches.map((sketch) => (
              <li key={sketch.id}>
                <Link
                  as={`/sketches/${sketch.id}?seed=${sketch.initialSeed}`}
                  href="/sketches/[id]"
                >
                  <a>
                    <span className="mb2">
                      {sketch.id}. {sketch.title}
                    </span>
                    <img alt="" src={`/sketches/${sketch.id}/preview.png`} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <style jsx>
        {`
          ul {
            display: grid;
            grid-gap: 40px;
            grid-template-columns: repeat(auto-fill, 250px);
            grid-auto-flow: row;
          }

          ul li {
            margin-bottom: 0;
          }

          img {
            display: block;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            margin-top: 20px;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const sketches = sketchIndex()

  return {
    props: {
      sketches,
    },
  }
}

export default Sketches