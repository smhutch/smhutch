import { Stack } from 'components/Stack'
import { Text } from 'components/Text'

const Index = () => {
  return (
    <>
      <main className="pt4">
        <Stack className="container">
          <Stack gap={4}>
            <Text el="h1" look="h2">
              Scott M. Hutcheson.
            </Text>
            <Text el="p">JavaScript Engineer at Sticker Mule.</Text>
          </Stack>
        </Stack>
      </main>
    </>
  )
}

export default Index
