'use client'

import { ChakraProvider } from '@chakra-ui/react'

const Providers = ({ children }) => {
  return (
    <ChakraProvider resetCSS={false}>
        {children}
    </ChakraProvider>
  );
}

export default Providers;