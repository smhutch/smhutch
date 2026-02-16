import { describe, expect, test } from 'bun:test'
import { lerp } from './math'

describe('lerp', () => {
  test('returns min when p is 0', () => {
    expect(lerp(10, 20, 0)).toBe(10)
  })

  test('returns max when p is 1', () => {
    expect(lerp(10, 20, 1)).toBe(20)
  })

  test('returns midpoint when p is 0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50)
  })

  test('works with negative values', () => {
    expect(lerp(-10, 10, 0.5)).toBe(0)
  })

  test('extrapolates beyond 0..1', () => {
    expect(lerp(0, 10, 2)).toBe(20)
    expect(lerp(0, 10, -1)).toBe(-10)
  })
})
