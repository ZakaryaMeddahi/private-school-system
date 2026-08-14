'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

const Providers = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS={false}>
          {children}
      </ChakraProvider>
    </CacheProvider>
  );
}

export default Providers;