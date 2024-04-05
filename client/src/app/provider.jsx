'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>
}