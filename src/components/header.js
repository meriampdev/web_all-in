import { Box, Image } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.png'

export const Header = () => {
  return (
    <Box
      position='absolute'
      top='25px'
      left='38px'
      zIndex='100'
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridGap={{base: '', md: '17px'}}
    >
      <Box
        width={{base: '', md: '54px'}}
        height={{base: '', md: '75px'}}
      >
        <Image 
          src={Logo?.src}
          objectFit='contain'
          height='100%'
          width='100%'
        />
      </Box>
      <Box>
        <Box
          fontSize={{base: '', md: '20px'}}
          lineHeight={{base: '', md: '34px'}}
        >
          わたしたちは知らない仕事のほうが多い
        </Box>
        <Box
          fontSize={{base: '', md: '14px'}}
          lineHeight={{base: '', md: '24px'}}
        >
          ー感情に合わせて求人が見つかるメディアー
        </Box>
      </Box>
    </Box>
  )
}