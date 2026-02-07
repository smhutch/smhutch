import Markdoc from '@markdoc/markdoc'
import type { RenderableTreeNodes } from '@markdoc/markdoc'
import React from 'react'
import { MARKDOC_COMPONENTS } from './markdown'

type MarkdocRenderer = typeof Markdoc.renderers.react
type MarkdocRendererParams = Parameters<MarkdocRenderer>
type MarkdocRendererReactParam = MarkdocRendererParams[1]
const markdocReact = React as MarkdocRendererReactParam

export const renderMarkdoc = (content: RenderableTreeNodes) => {
  return Markdoc.renderers.react(content, markdocReact, {
    components: MARKDOC_COMPONENTS,
    resolveTagName: (name) => {
      const component =
        name in MARKDOC_COMPONENTS
          ? MARKDOC_COMPONENTS[name as keyof typeof MARKDOC_COMPONENTS]
          : null
      if (component) return component
      return name
    },
  })
}
