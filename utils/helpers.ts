// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number'
}

export const isString = (value: unknown): value is number => {
  return typeof value === 'string'
}
