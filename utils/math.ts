import { clamp } from 'remeda'

export function lerp(min: number, max: number, p: number): number {
  return min + (max - min) * p
}

export function clampSign(v: number) {
  return clamp(v, { min: 0, max: 1 })
}

export function getP({
  current,
  max,
}: {
  current: number
  max: number
}) {
  const p = current / max
  return clampSign(p)
}

export function getArrayP({
  index,
  array,
}: { index: number; array: unknown[] }) {
  if (array.length <= 1) return 0
  const maxIndex = array.length - 1
  return getP({ current: index, max: maxIndex })
}
