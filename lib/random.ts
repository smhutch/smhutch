import { type RandomGenerator, xoroshiro128plus } from 'pure-rand'
import SimplexNoise from 'simplex-noise'

type Seed = number

export interface Random {
  setSeed: (seed: Seed) => void
  getSeed: () => Seed
  getRandomSeed: () => Seed
  chance: (probability: number) => boolean
  sign: () => number
  value: () => number
  noise1D: (d1: number, frequency?: number, amplitude?: number) => number
  noise2D: (
    d1: number,
    d2: number,
    frequency?: number,
    amplitude?: number
  ) => number
  noise3D: (
    d1: number,
    d2: number,
    d3: number,
    frequency?: number,
    amplitude?: number
  ) => number
  noise4D: (
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    frequency?: number,
    amplitude?: number
  ) => number
  pick: <Item>(array: Item[]) => Item
  range: (min: number, max: number) => number
  rangeFloor: (min: number, max: number) => number
  shuffle: <Arr>(array: Arr) => Arr
  weightedSet: <T extends { value: string; weight: number }>(
    set: Array<T> | ReadonlyArray<T>
  ) => T['value']
}

function toFloat(rng: RandomGenerator): number {
  return (rng.unsafeNext() >>> 0) / 0x100000000
}

export function createRandom(initialSeed?: Seed): Random {
  let _seed: Seed = initialSeed ?? Math.floor(Math.random() * 1_000_000)
  let _rng: RandomGenerator = xoroshiro128plus(_seed)
  let _simplex: SimplexNoise = new SimplexNoise(() => toFloat(_rng))

  const value = (): number => toFloat(_rng)

  const setSeed = (seed: Seed): void => {
    _seed = seed
    _rng = xoroshiro128plus(seed)
    _simplex = new SimplexNoise(() => toFloat(_rng))
  }

  const getSeed = (): Seed => _seed
  const getRandomSeed = (): Seed => Math.floor(Math.random() * 1_000_000)

  const chance = (probability: number): boolean => value() < probability
  const sign = (): number => (value() > 0.5 ? 1 : -1)

  const range = (min: number, max: number): number =>
    value() * (max - min) + min
  const rangeFloor = (min: number, max: number): number =>
    Math.floor(range(min, max))

  const noise1D = (d1: number, frequency = 1, amplitude = 1): number =>
    _simplex.noise2D(d1 * frequency, 0) * amplitude

  const noise2D = (
    d1: number,
    d2: number,
    frequency = 1,
    amplitude = 1
  ): number => _simplex.noise2D(d1 * frequency, d2 * frequency) * amplitude

  const noise3D = (
    d1: number,
    d2: number,
    d3: number,
    frequency = 1,
    amplitude = 1
  ): number =>
    _simplex.noise3D(d1 * frequency, d2 * frequency, d3 * frequency) * amplitude

  const noise4D = (
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    frequency = 1,
    amplitude = 1
  ): number =>
    _simplex.noise4D(
      d1 * frequency,
      d2 * frequency,
      d3 * frequency,
      d4 * frequency
    ) * amplitude

  const pick = <Item>(array: Item[]): Item => array[rangeFloor(0, array.length)]

  const shuffle = <Arr>(array: Arr): Arr => {
    const arr = [...(array as unknown as unknown[])]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = rangeFloor(0, i + 1)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr as unknown as Arr
  }

  const weightedSet = <T extends { value: string; weight: number }>(
    set: Array<T> | ReadonlyArray<T>
  ): T['value'] => {
    let totalWeight = 0
    for (const item of set) totalWeight += item.weight
    let r = value() * totalWeight
    for (const item of set) {
      r -= item.weight
      if (r <= 0) return item.value
    }
    return set[set.length - 1].value
  }

  return {
    setSeed,
    getSeed,
    getRandomSeed,
    chance,
    sign,
    value,
    noise1D,
    noise2D,
    noise3D,
    noise4D,
    pick,
    range,
    rangeFloor,
    shuffle,
    weightedSet,
  }
}

export const random = createRandom()
