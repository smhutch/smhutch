declare module 'seed-random' {
  function seedRandom(
    seed?: string,
    options?: { global?: boolean; entropy?: boolean }
  ): () => number
  export = seedRandom
}
