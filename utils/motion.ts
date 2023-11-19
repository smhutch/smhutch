import { Variant } from 'framer-motion'

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
      show: {
        opacity: 1,
        transition: {
          duration: 0.4,
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
  },
  {
    animate: 'show',
    initial: 'hidden',
  }
)
