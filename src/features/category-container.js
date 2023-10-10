import { Box } from '@chakra-ui/react'

export const CategoryContainer = ({ children, data }) => {
  return (
    <Box position='relative'>
      <Box position='relative' zIndex='100'>
        {children}
      </Box>
      <Box 
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='100%'
        overflowX='hidden'  
      >
        <Box
          position='fixed'
          top={{base: '', md: '54%'}}
          left={{base: '', md: '-15%'}}
          transform='matrix(0, 1, -1, 0, 0, 0)'
          color='#F8F8F8'
          opacity='0.05'
          fontSize={{base: '0', md: '5vw'}}
        >
        { data?.name ? `#${data?.name}` : ''}
        </Box>
        <Box 
          position='absolute'
          top='0'
          left='-400px'
          zIndex='0'
          borderRadius='full'
          width={{base: 0, md: '800px'}}
          height={{base: 0, md: '800px'}}
          background='transparent radial-gradient(closest-side at 50% 50%, #7EE2F0 0%, #FFFFFF00 100%, #222222 100%) 0% 0% no-repeat padding-box'
          opacity='0.3'
          animation='color 5s linear 0s infinite alternate'
          css={{
            '@keyframes color': {
              'from': {
                'filter': 'hue-rotate(0)'
              },
              "to": {
                'filter': 'hue-rotate(360deg)'
              }
            }
          }}
        />
        <Box 
          position='absolute'
          top='20%'
          right='-400px'
          zIndex='0'
          borderRadius='full'
          width={{base: 0, md: '800px'}}
          height={{base: 0, md: '800px'}}
          background='transparent radial-gradient(closest-side at 50% 50%, #7EE2F0 0%, #FFFFFF00 100%, #222222 100%) 0% 0% no-repeat padding-box'
          opacity='0.3'
          animation='color 5s linear 0s infinite alternate'
          css={{
            '@keyframes color': {
              'from': {
                'filter': 'hue-rotate(0)'
              },
              "to": {
                'filter': 'hue-rotate(360deg)'
              }
            }
          }}
        />
        <Box
          position='fixed'
          top={'40%'}
          right={'-8%'}
          transform='matrix(0, 1, -1, 0, 0, 0)'
          color='#F8F8F8'
          opacity='0.05'
          fontSize={{base: '0', md: '5vw'}}
        >
        UMPLEX
        </Box>
        <Box 
          position='absolute'
          bottom={'0%'}
          left='-400px'
          zIndex='0'
          borderRadius='full'
          width={{base: 0, md: '800px'}}
          height={{base: 0, md: '800px'}}
          background='transparent radial-gradient(closest-side at 50% 50%, #7EE2F0 0%, #FFFFFF00 100%, #222222 100%) 0% 0% no-repeat padding-box'
          opacity='0.3'
          animation='color 5s linear 0s infinite alternate'
          css={{
            '@keyframes color': {
              'from': {
                'filter': 'hue-rotate(0)'
              },
              "to": {
                'filter': 'hue-rotate(360deg)'
              }
            }
          }}
        />
      </Box>
    </Box>
  )
}