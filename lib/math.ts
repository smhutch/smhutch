export function lerp(min: number, max: number, p: number): number {
  return min * (1 - p) + max * p
}
