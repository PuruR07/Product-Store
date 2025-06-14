'use client'

import { ChakraProvider, theme } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'  // <- Make sure this path is correct

export function Provider(props) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
