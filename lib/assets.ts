export const absolutePath = (path: string): string => {
  return `${process.env.SITE_URL}/${path}`
}
