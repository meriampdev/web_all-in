import Head from 'next/head'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import NextLink from 'next/link'
import AboutImage from '@/assets/images/about.jpg'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function About() {
  return (
    <>
      <Box position='relative'>
        <Box margin='0 auto' width='100%' position='relative' zIndex='100'>
          <Box position='relative' height='100%'>
            <Flex justifyContent='space-between'>
              <Header />
              <Search 
                top={{base: '33px', md: '0'}}
                right={{base: '23px', md: '0'}}
                marginTop={{ base: '33px', md: '41px' }}
                marginRight={{base: '23px', md: '55px'}}
                marginLeft='auto'
              />
            </Flex>
          </Box>
          <Flex zIndex='1' mt={{base: '50px', md: '77px'}} flexDirection={{base: 'column', md: 'row'}}>
            <Box flex={{base: '1', md: '50%'}} position='relative'>
              <Box
                width={{base: '375px', md: '558px'}}
                height={{base: '418px', md: '623px'}}
              >
                <Image 
                  src={AboutImage?.src}
                  objectFit='contain'
                  height='100%'
                  width='100%'
                />
              </Box>
              <Text
                position='absolute'
                right={{ base: 'unset', md: '0'}}
                top={{ base: 'unset', md: '0'}}
                bottom={{ base: '-257px', md: 'unset'}}
                left={{ base: '-20px', md: 'unset'}}
                fontSize={{base: '60px', md: '100px'}}
                letterSpacing='6px'
                color='#F4F4F4'
                opacity='0.2'
                css={{
                  'writing-mode': 'vertical-lr'
                }}
              >
                ABOUT
              </Text>
            </Box>
            <Box 
              flex={{base: '1', md: '50%'}}
              px={{base: '25px', md: 0}}
            >
              <Text
                mt={{base: '50px', md: '0'}}
                fontSize={{base: '25px', md: '28px'}}
                lineHeight={{base: '43px', md: '44px'}}
              >
              このサイトについて
              </Text>
              <Box 
                mt={{ base: '20px', md: '30px'}}
                mb={{ base: '40px', md: '60px'}}
                height='2px'
                width='100px'
                background='white'
              />
              <Box
                fontSize={{base: '10px', md: '14px'}}
                lineHeight={'30px'}
                maxWidth={{base: '100%', md: '520px'}}
              >
                <Text
                  fontSize={{base: '', md: '32px'}}
                  textDecoration='underline'
                >
                  コンプレックスを、愛そう
                </Text> <br />
                誰しも日常のふとした瞬間に、劣等感に打ちのめされることがあります。スキル、学歴、<br />
                年収、会社の知名度。自分と他人を比べるたび、深いため息がこぼれるかもしれません。<br />
                ですが、あなたがコンプレックスに感じていることは、別の角度から映してみれば、そのひと自身も気づかなかった魅力になり得るはず。私たちは、そう信じているのです。<br />
                <br />
                求人広告を制作するときも同じです。私たちは限りなくフラットなまなざしで企業様を見つめ、コアとなる魅力を追求し、読み手の感情に訴えかけます。しかし、職種や業種という検索軸では、どうしても先入観が芽生えてしまう。そんな哀しいすれ違いのせいで、生まれなかった物語がいくつもありました。<br />
                <br />
                そして誕生したのが『Umplex』。感情を検索軸に据え、先入観にとらわれない出会いの場を提供します。「今日はどんな映画を観ようか」と映画館のポスターを眺めるときのように、心弾む体験があなたを待っています。曇りのないレンズで物語を見つめるとき、きっとあなたも新たな自分に出会うでしょう。そのとき、あなたのコンプレックスは、他に代えがたい持ち味になっているはずです。<br />
              </Box>
              <NextLink href='/contact' passHref>
                <Text 
                  fontSize={{ base: '12px', md: '16px'}}
                  mt={{base: '72px', md: '166px'}}
                >
                  運営会社 <ChevronRightIcon fontSize='20px' />
                </Text>
              </NextLink>
            </Box>
          </Flex>
          <Footer />
        </Box>
        <Box 
          position='absolute'
          bottom='0'
          left='-400px'
          zIndex='0'
          borderRadius='full'
          width={{base: 0, md: '800px'}}
          height={{base: 0, md: '800px'}}
          background='transparent radial-gradient(closest-side at 50% 50%, #7EE2F0 0%, #FFFFFF00 100%, #2B575D 100%) 0% 0% no-repeat padding-box'
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
    </>
  )
}
