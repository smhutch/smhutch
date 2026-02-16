import type { Variant } from 'motion/react'

const createMotionConfig = <VariantMap extends Record<string, Variant>>(
  variants: Record<string, VariantMap>,
  options: {
    animate: keyof VariantMap
    initial: keyof VariantMap
  }
) => {
  return {
    animate: options.animate,
    initial: options.initial,
    variants: variants,
  }
}

export const STAGGER_FADE = createMotionConfig(
  {
    container: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(2px)',
        transform: 'translateY(24px) scale(0.90)',
      },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translateY(0px) scale(1)',
      },
    },
  },
  {
    animate: 'show',
    initial: 'hidden',
  }
)
