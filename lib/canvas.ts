import { lerp } from 'canvas-sketch-util/math'

/**
 * Converts a decimal between 0..1 to a distribution of 0...1...0
 */
export function getNormalDistribution(decimal: number): number {
  return Math.abs(Math.cos(Math.PI * decimal))
}

/**
 * Converts a decimal between 0..1 to a distribution of 1...0...1
 */
export function getInvertedNormalDistribution(decimal: number): number {
  return lerp(1, 0, getNormalDistribution(decimal))
}
