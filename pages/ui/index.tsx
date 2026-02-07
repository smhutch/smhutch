// import { BOLD_COLORS, COLORS, NEUTRAL_COLORS, PALETTES } from 'data/palette'
import type { PropsWithChildren } from 'react'
import { css } from 'system/css'
import { Box, Container, Flex, Stack } from 'system/jsx'

import { Button } from 'components/Button'

const Story = (
  props: PropsWithChildren<{ heading: string; subheading?: string }>
) => {
  return (
    <Stack align="flex-start" gap={0} mb="24">
      <h2 className={css({ fontSize: '3xl', fontWeight: 'semibold', mb: 1 })}>
        {props.heading}
      </h2>
      <h3 className={css({ fontSize: 'xl', fontWeight: 'semibold', mb: 4 })}>
        {props.subheading}
      </h3>
      {props.children}
    </Stack>
  )
}

const ButtonStories: React.FC = () => {
  return (
    <Box bgColor="surface.sunken" flexGrow={1}>
      <Container mt={8}>
        <Story heading="Button">
          <Flex gap={4}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </Flex>
        </Story>
        {/* <Story heading="Colors" subheading="Foo">
          {Object.entries({
            ...NEUTRAL_COLORS,
            ...BOLD_COLORS,
          }).map(([paletteName, colorScheme]) => {
            return (
              <Stack key={paletteName} w="full" mb={4}>
                <p>{paletteName}</p>
                <Flex
                  borderRadius="md"
                  flexDirection="row-reverse"
                  flexGrow={1}
                  overflow="hidden"
                  shadow="md"
                >
                  {Object.entries(colorScheme).map(([name, color]) => {
                    return (
                      <div
                        key={name}
                        className={css({ height: '40px', flexGrow: 1 })}
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        <p>{name}</p>
                      </div>
                    )
                  })}
                </Flex>
              </Stack>
            )
          })}
        </Story> */}
      </Container>
    </Box>
  )
}

export default ButtonStories
