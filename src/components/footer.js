import { Container } from '@/components/container'
import { Box, Button, Center, Flex, HStack, Link, Image, Text, Icon } from '@chakra-ui/react'
import NextLink from 'next/link'
import Logo from '@/assets/images/footer_logo.png'
import { TwitterIcon } from '@/components/icons/TwitterIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'

export const Footer = () => {
  return (
    <Container
      paddingTop={{base: '115px', md: '153px'}}
      paddingLeft={{base: '', md: '132px'}}
      paddingRight={{base: '', md: '128px'}}
    >
      <Flex 
        width='100%' 
        justifyContent='space-between' 
        flexDirection={{ base: 'column', md: 'row'}}
      >
        <Box
          display='flex'
          flexDirection={{ base: 'column', md: 'row'}}
          alignItems='center'
          gridGap={{base: '17px', md: '18px'}}
          marginBottom={{base: '17px', md: 'unset'}}
        >
          <Box
            width={{base: '46px', md: '34px'}}
            height={{base: 'auto', md: '64px'}}
          >
            <Image 
              src={Logo?.src}
              objectFit='contain'
              height='100%'
              width='100%'
            />
          </Box>
          <Box textAlign={{base: 'center', md: 'unset'}}>
            <Box
              fontSize={{base: '15px', md: '16px'}}
              lineHeight={{base: '26px', md: '27px'}}
            >
              わたしたちは知らない仕事のほうが多い
            </Box>
            <Box
              fontSize={{base: '11px', md: '10px'}}
              lineHeight={{base: '19px', md: '17px'}}
            >
              ー感情に合わせて求人が見つかるメディアー
            </Box>
          </Box>
        </Box>
        <HStack spacing={{base: '20px', md: '30px'}} justifyContent='center'>
          {/* <Button
            height={{base: '43px', md: '43px'}}
            width={{base: '144px', md: '164px'}}
            borderRadius='full'
          >
            SIGN UP
          </Button> */}
          <NextLink href='/contact' passHref>
            <Button
              height={{base: '43px', md: '43px'}}
              width={{base: '144px', md: '164px'}}
              borderRadius='full'
            >
              CONTACT
            </Button>
          </NextLink>
        </HStack>
      </Flex>
      <Box 
        width='100%'
        height='1px'
        background='#969696'
        marginTop='20px'
        marginBottom='15px'
        display={{base: 'none', md: 'block'}}
      />
      <Flex 
        marginTop={{base: '20px', md: 'unset'}}
        justifyContent={{ base: 'center', md: 'space-between'}} 
        flexDirection={{base: 'column-reverse', md: 'row'}}
      >
        <Flex 
          flexWrap='wrap'
          justifyContent={'center'}
          gridGap={{base: '30px', md: '50px'}}
          fontSize={{base: '13px', md: '13px'}}
        >
          <NextLink href='/about'>
            このサイトについて
          </NextLink>
          <Link href='https://allhero.co.jp/about/' isExternal>
            運営会社について
          </Link>
          <NextLink href='/jobboard'>
            求人掲載について
          </NextLink>
          <Link href='https://allhero.co.jp/privacypolicy/' isExternal>
          プライバシーポリシー
          </Link>
        </Flex>
        <Box 
          width='100%'
          height='1px'
          background='#969696'
          marginTop='20px'
          marginBottom='15px'
          display={{base: 'block', md: 'none'}}
        />
        <Flex justifyContent='center' gridGap={{base: '17px', md: '17px'}}>
          <Link href='https://twitter.com/umplex82149' isExternal>
            <Icon 
              as={TwitterIcon}
              color='white'
            />
          </Link>
          <Link href='https://www.instagram.com/umplex_allin/' isExternal>
            <Icon 
              as={InstagramIcon}
              color='white'
            />
          </Link>
          <Link href='https://www.facebook.com/profile.php?id=61552056921897&is_tour_dismissed=true' isExternal>
            <Icon 
              as={FacebookIcon}
              color='white'
            />
          </Link>
        </Flex>
      </Flex>
      <Center paddingTop={{base: '37px', md: '62px'}} paddingBottom='10px'> 
        <Text
          color='#707070'
          fontSize={'10px'}
          lineHeight={'17px'}
        >
        © ALL-IN CO.,LTD. 2023
        </Text>
      </Center>
    </Container>
  )
}