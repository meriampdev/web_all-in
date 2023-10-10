import Head from 'next/head'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import NextLink from 'next/link'
import JobBoardImage from '@/assets/images/job_board.webp'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function JobBoard() {
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
          <Flex zIndex='2' mt={{base: '50px', md: '77px'}} flexDirection={{base: 'column', md: 'row'}}>
            <Box flex={{base: '1', md: '50%'}} position='relative'>
              <Box
                width={{base: '375px', md: '558px'}}
                height={{base: '419px', md: '623px'}}
              >
                <Image 
                  src={JobBoardImage?.src}
                  objectFit='contain'
                  height='100%'
                  width='100%'
                />
              </Box>
              <Text
                position='absolute'
                right={{ base: 'unset', md: '0'}}
                top={{ base: 'unset', md: '0'}}
                bottom={{ base: '-420px', md: 'unset'}}
                left={{ base: '-20px', md: 'unset'}}
                fontSize={{base: '60px', md: '100px'}}
                letterSpacing={{base: '3px', md: '6px'}}
                color='#F4F4F4'
                opacity='0.2'
                css={{
                  'writing-mode': 'vertical-lr'
                }}
              >
                JOB BOARD
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
              求人掲載について
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
              >
                テキストテキストテキストテキストテキスト <br />
                テキストテキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキストテキストテキスト <br />
                テキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキストテキストテキスト <br />
                テキストテキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキストテキスト <br />
                テキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキスト <br />
                テキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキストテキストテキストテキスト <br />
                テキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキスト <br />
                テキストテキストテキストテキストテキスト <br />
                <br />
                テキストテキストテキストテキストテキストテキスト
              </Box>
              <NextLink href='/contact' passHref>
                <Text 
                  fontSize={{ base: '12px', md: '16px'}}
                  mt={{base: '72px', md: '166px'}}
                >
                  お問い合わせ <ChevronRightIcon fontSize='20px' />
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
