import {
  Box,
  Center,
  Image,
} from '@chakra-ui/react'
import AboutImage from '@/assets/images/about.png'

export const FullPageLoader = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="100vw"
      bg={'black'}
      zIndex="100000"
    >
      <Center h="100%">
        <Box
          pos="relative"
          background='black'
          boxSize={{ base: '110px', md: '310px' }}
        >
          <Box
            boxSize={{ base: '110px', md: '310px' }}
            className="animatedBorder"
          />
          <Box pos="absolute" top="0" left="0" h="100%" w="100%" zIndex="1">
            <Center h="100%">
              <Image
                boxSize={{ base: '100px', md: '300px' }}
                src={AboutImage?.src}
                borderRadius='full'
              />
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}