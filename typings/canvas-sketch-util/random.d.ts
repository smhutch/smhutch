/**
 * Reference: https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md
 */
declare module 'canvas-sketch-util/random' {
  type Seed = number

  interface Random {
    // seed
    setSeed: (seed: Seed) => void
    getSeed: () => Seed
    getRandomSeed: () => Seed

    // values
    chance: (probability: number) => boolean
    sign: () => number
    value: () => number

    // noise
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

    // arrays
    pick: <Item>(array: Item[]) => Item
    range: (min: number, max: number) => number
    rangeFloor: (min: number, max: number) => number
    shuffle: <Arr>(array: Arr) => Arr

    // objects
    weightedSet: <T extends { value: string; weight: number }>(
      set: Array<T> | ReadonlyArray<T>
    ) => T['value']
  }

  function createRandom(): Random
}
