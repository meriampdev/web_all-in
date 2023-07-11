import { Box } from '@chakra-ui/react'

export const Container = ({ children, ...rest }) => {
  return (
    <Box 
      margin='0 auto'
      width='100%' 
      maxWidth={{ base: '100vw', xl: '1280px' }} 
      {...rest}
    >
      {children}
    </Box>
  )
}