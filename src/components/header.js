import { Box, Image } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.png'

export const Header = () => {
  return (
    <Box
      position='absolute'
      top={{ base: '27px', md: '25px'}}
      left={{ base: 'unset', md: '38px'}}
      right={{base: '18px', md: 'unset'}}
      zIndex='100'
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridGap={{base: '7px', md: '17px'}}
    >
      <Box
        width={{base: '34px', md: '54px'}}
        height={{base: 'auto', md: '75px'}}
      >
        <Image 
          src={Logo?.src}
          objectFit='contain'
          height='100%'
          width='100%'
        />
      </Box>
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
    </Box>
  )
}