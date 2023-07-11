import { Box, Button, Center, Flex, HStack, Link, Image, Text, Icon } from '@chakra-ui/react'
import Logo from '@/assets/images/logo.png'
import { TwitterIcon } from '@/components/icons/TwitterIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'

export const Footer = () => {
  return (
    <Box
      paddingTop={{base: '', md: '153px'}}
      paddingLeft={{base: '', md: '132px'}}
      paddingRight={{base: '', md: '128px'}}
    >
      <Flex justifyContent='space-between'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          gridGap={{base: '', md: '18px'}}
        >
          <Box
            width={{base: '', md: '34px'}}
            height={{base: '', md: '64px'}}
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
              fontSize={{base: '', md: '16px'}}
              lineHeight={{base: '', md: '27px'}}
            >
              わたしたちは知らない仕事のほうが多い
            </Box>
            <Box
              fontSize={{base: '', md: '10px'}}
              lineHeight={{base: '', md: '17px'}}
            >
              ー感情に合わせて求人が見つかるメディアー
            </Box>
          </Box>
        </Box>
        <HStack spacing={{base: '', md: '30px'}}>
          <Button
            height={{base: '', md: '43px'}}
            width={{base: '', md: '164px'}}
            borderRadius='full'
          >
            SIGN UP
          </Button>
          <Button
            height={{base: '', md: '43px'}}
            width={{base: '', md: '164px'}}
            borderRadius='full'
          >
            CONTACT
          </Button>
        </HStack>
      </Flex>
      <Box 
        width='100%'
        height='0'
        border='0.25px solid #969696'
        marginTop='20px'
        marginBottom='15px'
      />
      <Flex justifyContent='space-between'>
        <Flex 
          gridGap={{base: '', md: '50px'}}
          fontSize={{base: '', md: '13px'}}
        >
          <Link href='#'>
            このサイトについて
          </Link>
          <Link href='#'>
            運営会社について
          </Link>
          <Link href='#'>
            求人掲載について
          </Link>
          <Link href='#'>
            プラポリ
          </Link>
        </Flex>
        <Flex gridGap={{base: '', md: '17px'}}>
          <Icon 
            as={TwitterIcon}
            color='white'
          />
          <Icon 
            as={InstagramIcon}
            color='white'
          />
          <Icon 
            as={FacebookIcon}
            color='white'
          />
        </Flex>
      </Flex>
      <Center paddingTop={{base: '', md: '62px'}} paddingBottom='10px'> 
        <Text
          color='#707070'
          fontSize={{base: '', md: '10px'}}
          lineHeight={{base: '', md: '17px'}}
        >
        © ALL-IN CO.,LTD. 2023
        </Text>
      </Center>
    </Box>
  )
}