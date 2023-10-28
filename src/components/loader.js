import {
  Box,
  Center,
  Image,
} from '@chakra-ui/react'
import AboutImage from '@/assets/images/umplex.jpg'

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
          boxSize={{ base: '200px', md: '280px' }}
        >
          <Box
            boxSize={{ base: '200px', md: '280px' }}
            className="animatedBorder"
          />
          <Center 
            pos="absolute" 
            top="0" 
            left="0" 
            height="100%" 
            width="100%" 
            zIndex="1" 
            borderRadius='full' 
          >
            <Box 
              height='97%'
              width='97%'
              borderRadius='full' 
              background='black' 
            />
          </Center>
          <Box pos="absolute" top="0" left="0" h="100%" w="100%" zIndex="2">
            <Center h="100%">
              <Image
                objectFit='contain'
                width={{base: '100px', md: '120px'}}
                height={{base: '150px', md: '180px'}}
                src={AboutImage?.src}
              />
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}