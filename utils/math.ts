export function lerp(min: number, max: number, p: number): number {
  return min + (max - min) * p
}
