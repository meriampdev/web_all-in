import { Box, Image, useBreakpointValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import Logo from '@/assets/images/header_logo.png'

export const Header = ({ withTextOnSp = true, ...rest }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      zIndex='100'
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridGap={{base: '7px', md: '17px'}}
    >
      <NextLink href='/'>
        <Box
          width={{base: '66px', md: '83px'}}
          height={{base: '72px', md: '90px'}}
        >
          <Image 
            src={Logo?.src}
            objectFit='contain'
            height='100%'
            width='100%'
          />
        </Box>
      </NextLink>
      {/* {(!isMobile || (isMobile && withTextOnSp)) && (
        <Box textAlign={{base: 'right', md: 'left'}}>
          <Box
            fontSize={{base: '16px', md: '20px'}}
            lineHeight={{base: '27px', md: '34px'}}
          >
            わたしたちは知らない仕事のほうが多い
          </Box>
          <Box
            fontSize={{base: '13px', md: '14px'}}
            lineHeight={{base: '23px', md: '24px'}}
          >
            ー感情に合わせて求人が見つかるメディアー
          </Box>
        </Box>
      )} */}
    </Box>
  )
}