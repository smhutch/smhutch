export interface BlogSettings {
  /** 001, 002, 003 etc. Used to sort within index */
  id: string
  /** Used as the page meta title, and post h1 */
  title: string
  /** Used as the page meta description */
  description: string
  /** date string */
  publishedOn: string
}

export interface BlogPreview extends BlogSettings {
  /** derived from post location in file system */
  permalink: string
}
