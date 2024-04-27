import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans'
import '@fontsource/raleway'

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export default theme