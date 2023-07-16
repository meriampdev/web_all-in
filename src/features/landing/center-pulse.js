import { Box, Center } from '@chakra-ui/react'

export const CenterPulse = () => {
  return (
    <Center 
      position='absolute'
      top={{ base: '209px', md: '17px'}}
      left='0'
      zIndex='6'
      width='100%'
      height={{base: '260px', lg: '567px'}}
    >
      <Center 
        width={{base: '100%', lg: '567px'}}
        height={{base: '260px', lg: '567px'}}
        borderRadius='full'
        background='transparent radial-gradient(closest-side at 50% 50%, #30D3EA 0%, #30CDE4 39%, #FFFFFF00 100%) 0% 0% no-repeat padding-box'
        opacity='0.3'
      >
        <Box 
          width={{base: '260px', lg: '285px'}}
          height={{base: '260px', lg: '285px'}}
          animation='mv-pulse 2s infinite'
          borderRadius='full'
          border='1px solid white'
        />
      </Center>
    </Center>
  )
}