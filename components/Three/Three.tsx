import { useRouter } from 'next/router'

import { Button } from 'components/Button'
import { Pagination } from 'components/Pagination'
import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

interface Props {
  getRandomSeed(): number
  id: string
  title: string
  next?: string
  prev?: string
}

export const Three: React.FC<Props> = ({
  children,
  getRandomSeed,
  id,
  next,
  prev,
  title,
}) => {
  const router = useRouter()

  return (
    <>
      <main className="py4">
        <div className="sketch container">
          <div className="info">
            <Stack>
              <Text el="h1">{title}</Text>
              <Pagination
                id={id}
                next={next && `/3D/${next}`}
                prev={prev && `/3D/${prev}`}
              />
            </Stack>
          </div>
          <div className="canvas">{children}</div>
          <div className="actions">
            <Button
              className="mr4"
              onClick={() =>
                router.push(`/3D/${id}`, {
                  query: {
                    seed: getRandomSeed(),
                  },
                })
              }
              variant="link"
            >
              Randomize
            </Button>
            <a
              href={`https://github.com/smhutch/smhutch/tree/main/3D/${id}.ts`}
              rel="noopener noreferrer"
              target="_blank"
              title="previous"
            >
              View code
            </a>
          </div>
        </div>
        <div className="bg" />
      </main>
      <style jsx>
        {`
          .sketch {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: var(--space-4);
            max-width: 1000px;
          }

          .canvas {
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          }

          .canvas :global(canvas) {
            background-color: white;
            width: 100%;
            max-width: 500px;
            height: 500px;
          }

          @media screen and (min-width: 800px) {
            .sketch {
              grid-template-columns: 1fr 500px;
              grid-template-rows: 1fr auto;
            }

            .canvas {
              grid-row: 1 / -1;
              grid-column: 2 / 3;
            }

            .bg {
              height: 30vh;
              min-height: 200px;
              width: 100%;
              left: 0;
              background: linear-gradient(#f5f5f5, white);
              margin-top: calc(0px - var(--space-6));
            }

            .info {
              margin-top: var(--space-5);
            }

            .actions {
              margin-bottom: var(--space-6);
              padding-bottom: var(--space-3);
            }
          }
        `}
      </style>
    </>
  )
}
