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
          width={{base: '160px', md: '190px'}}
          height={{base: '210px', md: '250px'}}
          overflow='hidden'
        >
          <Box
            width={{base: '400px', md: '400px'}}
            height={{base: '400px', md: '400px'}}
            className="animatedBorder"
            borderRadius='0'
            top={{base: '-70px', md: '-70px'}}
            left={{base: '-70px', md: '-70px'}}
          />
          <Box pos="absolute" top="0" left="0" h="100%" w="100%" zIndex="1">
            <Center h="100%">
              <Image
                objectFit='contain'
                width={{base: '150px', md: '180px'}}
                height={{base: '200px', md: '240px'}}
                src={AboutImage?.src}
              />
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}