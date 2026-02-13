import type { ExternalLinkConfig } from 'types/content'

export const WORK_LINKS = [
  {
    href: 'https://foundation-labs.xyz',
    label: 'Foundation Labs, Inc.',
  },
  {
    href: 'https://codesandbox.io/',
    label: 'CodeSandbox',
  },
  {
    href: 'https://www.desana.io/',
    label: 'Desana',
  },
  {
    href: 'https://www.stickermule.com',
    label: 'Sticker Mule',
  },
] as const satisfies ExternalLinkConfig[]

export const WEB_LINKS = [
  {
    href: '/scott-hutcheson-cv.pdf',
    label: 'Résumé',
  },
  {
    href: 'https://github.com/smhutch',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/SMHutcheson',
    label: 'X (Twitter)',
  },
] as const satisfies ExternalLinkConfig[]
