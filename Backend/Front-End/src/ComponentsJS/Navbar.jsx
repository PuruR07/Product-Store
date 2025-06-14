import { Box, Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useColorMode, useColorModeValue } from '@/components/ui/color-mode'

const Navbar = () => {

  const {colorMode, toggleColorMode}= useColorMode();

  return (
    <Container maxW={"1140px"} p={4}  >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }}>

        <Box
          // bgGradient="linear(to-r, #06b6d4, #3b82f6)" // cyan.400 and blue.500
          // bgClip="text"
          fontSize={{ base: 22, sm: 28 }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          // color={"whitesmoke"}
          color={useColorModeValue("#121212", "white")}
        >
          <Link to="/" >
          <Text color={"blue.500"}>

          Product Shop🛒
          </Text>
          </Link> 
        </Box>

        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button  p={6} bgColor={useColorModeValue("transparent", "#2D323F")}>
              <PlusSquareIcon boxSize={8} color={useColorModeValue('#121212',"whitesmoke")}   />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} p={6} bgColor={useColorModeValue('transparent','#2D323F')} borderColor={useColorModeValue('#121212', 'none')} >
            {colorMode === 'light' ? "🌑" : "☀️"} 
          </Button>
        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar