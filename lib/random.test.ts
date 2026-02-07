import { describe, expect, test } from 'bun:test'
import { createRandom } from './random'

describe('createRandom', () => {
  test('accepts an initial seed', () => {
    const r = createRandom(42)
    expect(r.getSeed()).toBe(42)
  })

  test('generates a random seed when none provided', () => {
    const r = createRandom()
    expect(typeof r.getSeed()).toBe('number')
  })
})

describe('seed determinism', () => {
  test('same seed produces same sequence', () => {
    const a = createRandom(123)
    const b = createRandom(123)
    const seqA = Array.from({ length: 10 }, () => a.value())
    const seqB = Array.from({ length: 10 }, () => b.value())
    expect(seqA).toEqual(seqB)
  })

  test('setSeed resets the sequence', () => {
    const r = createRandom(123)
    const first = r.value()
    r.setSeed(123)
    expect(r.value()).toBe(first)
  })

  test('different seeds produce different sequences', () => {
    const a = createRandom(1)
    const b = createRandom(2)
    expect(a.value()).not.toBe(b.value())
  })
})

describe('value', () => {
  test('returns floats in [0, 1)', () => {
    const r = createRandom(42)
    for (let i = 0; i < 100; i++) {
      const v = r.value()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('range', () => {
  test('returns values within [min, max)', () => {
    const r = createRandom(42)
    for (let i = 0; i < 100; i++) {
      const v = r.range(5, 10)
      expect(v).toBeGreaterThanOrEqual(5)
      expect(v).toBeLessThan(10)
    }
  })
})

describe('rangeFloor', () => {
  test('returns integers within [min, max)', () => {
    const r = createRandom(42)
    for (let i = 0; i < 100; i++) {
      const v = r.rangeFloor(0, 5)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(5)
      expect(Number.isInteger(v)).toBe(true)
    }
  })
})

describe('chance', () => {
  test('always true with probability 1', () => {
    const r = createRandom(42)
    for (let i = 0; i < 50; i++) {
      expect(r.chance(1)).toBe(true)
    }
  })

  test('always false with probability 0', () => {
    const r = createRandom(42)
    for (let i = 0; i < 50; i++) {
      expect(r.chance(0)).toBe(false)
    }
  })
})

describe('sign', () => {
  test('returns only 1 or -1', () => {
    const r = createRandom(42)
    for (let i = 0; i < 100; i++) {
      const s = r.sign()
      expect(s === 1 || s === -1).toBe(true)
    }
  })
})

describe('pick', () => {
  test('returns an element from the array', () => {
    const r = createRandom(42)
    const arr = ['a', 'b', 'c']
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(r.pick(arr))
    }
  })
})

describe('shuffle', () => {
  test('returns array with same elements', () => {
    const r = createRandom(42)
    const arr = [1, 2, 3, 4, 5]
    const shuffled = r.shuffle(arr)
    expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5])
  })

  test('does not mutate the original', () => {
    const r = createRandom(42)
    const arr = [1, 2, 3, 4, 5]
    r.shuffle(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('noise', () => {
  test('noise2D returns values in [-1, 1]', () => {
    const r = createRandom(42)
    for (let i = 0; i < 100; i++) {
      const n = r.noise2D(i * 0.1, i * 0.2)
      expect(n).toBeGreaterThanOrEqual(-1)
      expect(n).toBeLessThanOrEqual(1)
    }
  })

  test('noise2D is deterministic with same seed', () => {
    const a = createRandom(42)
    const b = createRandom(42)
    expect(a.noise2D(0.5, 0.5)).toBe(b.noise2D(0.5, 0.5))
  })

  test('frequency scales input', () => {
    const a = createRandom(42)
    const b = createRandom(42)
    expect(a.noise2D(1, 1, 2)).toBe(b.noise2D(2, 2, 1))
  })

  test('amplitude scales output', () => {
    const a = createRandom(42)
    const b = createRandom(42)
    const base = a.noise2D(0.5, 0.5)
    const scaled = b.noise2D(0.5, 0.5, 1, 3)
    expect(scaled).toBeCloseTo(base * 3)
  })
})

describe('weightedSet', () => {
  test('respects weights over many samples', () => {
    const r = createRandom(42)
    const set = [
      { value: 'heavy', weight: 100 },
      { value: 'light', weight: 1 },
    ] as const
    let heavyCount = 0
    const n = 1000
    for (let i = 0; i < n; i++) {
      if (r.weightedSet(set) === 'heavy') heavyCount++
    }
    expect(heavyCount / n).toBeGreaterThan(0.9)
  })
})

describe('getRandomSeed', () => {
  test('returns a number', () => {
    const r = createRandom(42)
    expect(typeof r.getRandomSeed()).toBe('number')
  })
})
