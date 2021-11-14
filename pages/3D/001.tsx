import { OrbitControls, useHelper } from '@react-three/drei'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { lerp } from 'canvas-sketch-util/math'
import { createRandom } from 'canvas-sketch-util/random'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Object3D, PointLightHelper } from 'three'
import * as THREE from 'three'

import { Three } from 'components/Three/Three'

const random = createRandom()
random.setSeed()

const SPACE = 12
const HALF = SPACE / 2

interface BoxProps extends MeshProps {
  gap: number
  emissive: string
  emissiveIntensity: number
  lines: number
  maxRotation: number
  metalness: number
  noise: number
  p: number
  roughness: number
}

const Box: React.FC<BoxProps> = (props) => {
  const meshRef = useRef<Object3D>()
  useFrame(({ clock }) => {
    const mesh = meshRef.current

    const t = Math.sin(clock.getElapsedTime())
    const yBoxScale = SPACE / props.lines
    const yGap = yBoxScale * props.gap
    const yScale = yBoxScale - yGap

    // Positiion
    mesh.position.y = lerp(-HALF + yScale / 2, HALF - yScale / 2, props.p)

    // Rotation
    mesh.rotation.y = lerp(Math.PI * t * props.maxRotation, 0, props.noise)

    // Scale
    mesh.scale.x = lerp(SPACE, 0.2, props.p)
    mesh.scale.y = yScale
    mesh.scale.z = lerp(SPACE, 0.2, props.p)
  })
  return (
    <mesh {...props} ref={meshRef} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial
        emissive={new THREE.Color(props.emissive)}
        emissiveIntensity={props.emissiveIntensity}
        metalness={props.metalness}
        roughness={props.roughness}
      />
    </mesh>
  )
}

const Draw = () => {
  const base = useControls({
    lines: {
      min: 5,
      max: 100,
      step: 1,
      value: 25,
    },
  })
  const { lines } = base
  const pl = useControls('pointLight', {
    color: '#ffffff',
    position: [0, SPACE, SPACE],
    intensity: {
      min: 0.1,
      max: 1,
      step: 0.01,
      value: 1,
    },
  })
  const dl = useControls('directionalLight', {
    color: '#ffc900',
    position: [0, 0, SPACE / 2],
    intensity: {
      min: 0.1,
      max: 1,
      step: 0.01,
      value: 1,
    },
  })
  const box = useControls('mesh', {
    gap: {
      min: 0,
      max: 0.8,
      step: 0.01,
      value: 0.2,
    },
    emissive: '#000000',
    emissiveIntensity: {
      min: 0.1,
      max: 1,
      step: 0.01,
      value: 1,
    },
    maxRotation: {
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.2,
    },
    metalness: {
      min: 0.1,
      max: 1,
      step: 0.01,
      value: 0.7,
    },
    roughness: {
      min: 0.1,
      max: 1,
      step: 0.01,
      value: 0.2,
    },
  })

  const plRef = useRef()
  useHelper(plRef, PointLightHelper, 'red')

  return (
    <>
      <pointLight
        ref={plRef}
        color={pl.color}
        intensity={pl.intensity}
        position={pl.position}
        castShadow
      />
      <directionalLight
        color={dl.color}
        intensity={dl.intensity}
        position={dl.position}
        castShadow
      />
      {Array.from({ length: lines }).map((_, index) => {
        const p = index / (lines - 1)

        return (
          <Box
            key={`${index}`}
            emissive={box.emissive}
            emissiveIntensity={box.emissiveIntensity}
            gap={box.gap}
            lines={lines}
            maxRotation={box.maxRotation}
            metalness={box.metalness}
            noise={random.noise1D(p, 2)}
            p={p}
            roughness={box.roughness}
          />
        )
      })}

      <OrbitControls />
    </>
  )
}

const Base: React.FC = () => {
  return (
    <Three
      getRandomSeed={() => {
        const seed = random.getRandomSeed()
        random.setSeed(seed)
        return seed
      }}
      id="001"
      title="Base"
    >
      <Canvas
        camera={{
          position: [15, 0, 15],
        }}
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        }}
      >
        <Draw />
      </Canvas>
    </Three>
  )
}

export default Base
