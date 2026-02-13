import type { PropsWithChildren } from 'react'
import { css } from 'system/css'
import { Container, Flex, Stack } from 'system/jsx'
import { token } from 'system/tokens'

const SEMANTIC_COLORS = {
  Surface: [
    { name: 'surface.page', token: token('colors.surface.page') },
    { name: 'surface.sunken', token: token('colors.surface.sunken') },
  ],
  Text: [
    { name: 'text', token: token('colors.text') },
    { name: 'text.primary', token: token('colors.text.primary') },
    { name: 'text.secondary', token: token('colors.text.secondary') },
    { name: 'text.tertiary', token: token('colors.text.tertiary') },
  ],
  Border: [{ name: 'border', token: token('colors.border') }],
  Accent: [
    { name: 'accent.primary', token: token('colors.accent.primary') },
    { name: 'accent.hover', token: token('colors.accent.hover') },
  ],
} as const

const FONT_SIZES = [
  { name: '2xs', token: token('fontSizes.2xs') },
  { name: 'xs', token: token('fontSizes.xs') },
  { name: 'sm', token: token('fontSizes.sm') },
  { name: 'md', token: token('fontSizes.md') },
  { name: 'lg', token: token('fontSizes.lg') },
  { name: 'xl', token: token('fontSizes.xl') },
  { name: '2xl', token: token('fontSizes.2xl') },
  { name: '3xl', token: token('fontSizes.3xl') },
  { name: '4xl', token: token('fontSizes.4xl') },
  { name: '5xl', token: token('fontSizes.5xl') },
  { name: '6xl', token: token('fontSizes.6xl') },
] as const

const SPACING = [
  { name: '0', token: token('spacing.0') },
  { name: '1', token: token('spacing.1') },
  { name: '2', token: token('spacing.2') },
  { name: '3', token: token('spacing.3') },
  { name: '4', token: token('spacing.4') },
  { name: '5', token: token('spacing.5') },
  { name: '6', token: token('spacing.6') },
  { name: '8', token: token('spacing.8') },
  { name: '10', token: token('spacing.10') },
  { name: '12', token: token('spacing.12') },
  { name: '16', token: token('spacing.16') },
  { name: '20', token: token('spacing.20') },
  { name: '24', token: token('spacing.24') },
  { name: '32', token: token('spacing.32') },
] as const

const RADII = [
  { name: 'xs', token: token('radii.xs') },
  { name: 'sm', token: token('radii.sm') },
  { name: 'md', token: token('radii.md') },
  { name: 'lg', token: token('radii.lg') },
  { name: 'xl', token: token('radii.xl') },
  { name: '2xl', token: token('radii.2xl') },
  { name: '3xl', token: token('radii.3xl') },
  { name: 'full', token: token('radii.full') },
] as const

const SHADOWS = [
  { name: '2xs', token: token('shadows.2xs') },
  { name: 'xs', token: token('shadows.xs') },
  { name: 'sm', token: token('shadows.sm') },
  { name: 'md', token: token('shadows.md') },
  { name: 'lg', token: token('shadows.lg') },
  { name: 'xl', token: token('shadows.xl') },
  { name: '2xl', token: token('shadows.2xl') },
] as const

const DesignTokens: React.FC = () => {
  return (
    <Container mt={8} mb={16}>
      <h1
        className={css({
          fontSize: '4xl',
          fontWeight: 'semibold',
          mb: 12,
          letterSpacing: 'tight',
        })}
      >
        Design Tokens
      </h1>

      {Object.entries(SEMANTIC_COLORS).map(([group, tokens]) => (
        <Section key={group} heading={group}>
          <Flex flexDirection="column" gap={2}>
            {tokens.map((t) => (
              <ColorSwatch key={t.name} name={t.name} token={t.token} />
            ))}
          </Flex>
        </Section>
      ))}

      <Section heading="Font Sizes">
        <Stack gap={2}>
          {FONT_SIZES.map((t) => (
            <Flex key={t.name} align="baseline" gap={4}>
              <span
                className={css({
                  w: 10,
                  fontSize: 'xs',
                  color: 'text.tertiary',
                  fontFamily: 'mono',
                  flexShrink: 0,
                })}
              >
                {t.name}
              </span>
              <span style={{ fontSize: t.token }}>Aa</span>
              <span
                className={css({
                  fontSize: 'xs',
                  color: 'text.tertiary',
                  fontFamily: 'mono',
                })}
              >
                {t.token}
              </span>
            </Flex>
          ))}
        </Stack>
      </Section>

      <Section heading="Spacing">
        <Stack gap={2}>
          {SPACING.map((t) => (
            <Flex key={t.name} align="center" gap={4}>
              <span
                className={css({
                  w: 8,
                  fontSize: 'xs',
                  color: 'text.tertiary',
                  fontFamily: 'mono',
                  flexShrink: 0,
                })}
              >
                {t.name}
              </span>
              <div
                className={css({
                  h: 3,
                  borderRadius: 'sm',
                  backgroundColor: 'border',
                })}
                style={{ width: t.token }}
              />
              <span
                className={css({
                  fontSize: 'xs',
                  color: 'text.tertiary',
                  fontFamily: 'mono',
                })}
              >
                {t.token}
              </span>
            </Flex>
          ))}
        </Stack>
      </Section>

      <Section heading="Radii">
        <Flex wrap="wrap" gap={4}>
          {RADII.map((t) => (
            <Stack key={t.name} align="center" gap={2}>
              <div
                className={css({
                  w: 16,
                  h: 16,
                  backgroundColor: 'surface.sunken',
                  border: '1px solid',
                  borderColor: 'border',
                })}
                style={{ borderRadius: t.token }}
              />
              <span
                className={css({
                  fontSize: 'xs',
                  fontFamily: 'mono',
                  color: 'text.tertiary',
                })}
              >
                {t.name}
              </span>
            </Stack>
          ))}
        </Flex>
      </Section>

      <Section heading="Shadows">
        <Flex wrap="wrap" gap={6}>
          {SHADOWS.map((t) => (
            <Stack key={t.name} align="center" gap={2}>
              <div
                className={css({
                  w: 20,
                  h: 20,
                  borderRadius: 'xl',
                  backgroundColor: 'surface.page',
                })}
                style={{ boxShadow: t.token }}
              />
              <span
                className={css({
                  fontSize: 'xs',
                  fontFamily: 'mono',
                  color: 'text.tertiary',
                })}
              >
                {t.name}
              </span>
            </Stack>
          ))}
        </Flex>
      </Section>
    </Container>
  )
}

const Section = (props: PropsWithChildren<{ heading: string }>) => {
  return (
    <Stack gap={0} mb="16">
      <h2
        className={css({
          fontSize: '2xl',
          fontWeight: 'semibold',
          mb: 6,
          pb: 3,
          borderBottom: '1px solid {colors.border}',
          borderBottomColor: 'border',
        })}
      >
        {props.heading}
      </h2>
      {props.children}
    </Stack>
  )
}

const ColorSwatch = (props: { name: string; token: string }) => {
  return (
    <Flex align="center" gap={3}>
      <div
        className={css({
          w: 16,
          h: 16,
          borderRadius: 'sm',
          border: '1px solid',
          borderColor: 'border/60',
          flexShrink: 0,
        })}
        style={{ backgroundColor: props.token }}
      />
      <Stack gap={0}>
        <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
          {props.name}
        </span>
        <span
          className={css({
            fontSize: 'xs',
            color: 'text.tertiary',
            fontFamily: 'mono',
          })}
        >
          {props.token}
        </span>
      </Stack>
    </Flex>
  )
}

export default DesignTokens
