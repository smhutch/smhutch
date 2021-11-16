import { lerp } from 'canvas-sketch-util/math'
import { createRandom } from 'canvas-sketch-util/random'
import { folder, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'

import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import {
  getInvertedNormalDistribution,
  getNormalDistribution,
} from 'lib/canvas'

const A4Ratio = 210 / 297

const random = createRandom()
random.setSeed(random.getRandomSeed())

interface Item {
  width: number
  height: number
  x: number
  y: number
  rotation: number
}

const Plotter: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>()
  const controls = useControls({
    page: folder({
      cols: {
        value: 10,
        min: 5,
        max: 60,
        step: 1,
      },
      rows: {
        value: 10,
        min: 5,
        max: 40,
        step: 1,
      },
      rowMultiplier: {
        value: 5,
        min: 1,
        max: 10,
        step: 1,
      },
      margin: {
        value: 0.2,
        min: 0,
        max: 0.3,
        step: 0.01,
      },
    }),
    scale: folder({
      scale: {
        value: 0.4,
        min: 0.1,
        max: 1.0,
        step: 0.01,
      },
      scaleAmp: {
        value: 1,
        min: 1,
        max: 20,
        step: 0.01,
      },
      scaleFreqX: {
        value: 2,
        min: 0,
        max: 10,
        step: 0.01,
      },
      scaleFreqY: {
        value: 2,
        min: 0,
        max: 10,
        step: 0.01,
      },
    }),
    rotation: folder({
      rotation: {
        value: 0,
        min: 0,
        max: 360,
        step: 1,
      },
      rotAmpY: {
        value: 1,
        min: 1,
        max: 10,
        step: 0.01,
      },
      rotFreqX: {
        value: 0.7,
        min: 0,
        max: 2,
        step: 0.01,
      },
      rotFreqY: {
        value: 0.7,
        min: 0,
        max: 2,
        step: 0.01,
      },
    }),
    random: folder({
      centerRandomness: true,
    }),
  })
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [items, setItems] = useState<Item[]>([])

  useEffect(function enforceA4Resolution() {
    const svg = svgRef.current
    if (!svg) return

    const size = svg.getBoundingClientRect()
    setSize({
      width: size.width,
      height: size.width * A4Ratio,
    })
  }, [])

  useEffect(
    function mapControlsToSvg() {
      const svg = svgRef.current
      if (!svg) return

      const cols = controls.cols
      const items: Item[] = []

      const marginX = size.width * controls.margin
      const marginY = size.height * controls.margin

      for (let x = 0; x < cols; x++) {
        const px = x / (cols - 1)

        const totalSpaceX = size.width - marginX * 2
        const boxSpaceX = totalSpaceX / cols
        const boxWidth = boxSpaceX * controls.scale

        const rows = Math.ceil(
          controls.rows + controls.rows * controls.rowMultiplier * px
        )

        for (let y = 0; y < rows; y++) {
          const py = y / (rows - 1)

          const totalSpaceY = size.height - marginY * 2
          const boxSpaceY = totalSpaceY / rows
          const boxHeight = boxSpaceY * controls.scale

          const scaleNoise =
            random.noise2D(px * controls.scaleFreqX, py * controls.scaleFreqY) *
            controls.scaleAmp

          const rotationNoise =
            random.noise2D(px * controls.rotFreqX, py * controls.rotFreqY) *
            controls.rotAmpY

          const width = Math.abs(boxWidth + boxWidth * scaleNoise)
          const height = Math.abs(boxHeight + boxHeight * scaleNoise)

          items.push({
            width,
            height: Math.abs(height),
            x: lerp(marginX, size.width - marginX - width, px),
            y: lerp(marginY, size.height - marginY - height, py),
            rotation: controls.rotation * rotationNoise,
          })
        }
      }

      setItems(items)
    },
    [controls, size]
  )

  return (
    <>
      <Box className="container py4">
        <Box className="pb4">
          <h1>Plotter playground</h1>
          <p>A playground to generate A4 plotter art.</p>
          <Flex>
            <Button
              onClick={() => {
                const svg = svgRef.current
                if (!svg) return

                const serializer = new XMLSerializer()
                const src = serializer.serializeToString(svg)

                const anchor = document.createElement('a')
                anchor.setAttribute('download', `plot-${random.getSeed()}.svg`)
                anchor.setAttribute(
                  'href',
                  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(src)}`
                )
                anchor.click()
              }}
              variant="link"
            >
              Download
            </Button>
          </Flex>
        </Box>
        <svg
          ref={svgRef}
          style={{ width: '100%' }}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          {items.map((item, index) => {
            return (
              <g
                key={index}
                transform={`translate(${item.x},${item.y}) rotate(${item.rotation} 0 0)`}
                x={0}
                y={0}
              >
                <rect
                  fill="transparent"
                  height={item.height}
                  stroke="black"
                  strokeLinejoin="round"
                  width={item.width}
                />
              </g>
            )
          })}
        </svg>
      </Box>
      <style jsx>
        {`
          svg {
            background-color: white;
            width: 100%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }

          h1 {
            margin-bottom: var(--space-3);
          }

          p {
            margin-bottom: var(--space-3);
          }
        `}
      </style>
    </>
  )
}

export default Plotter
