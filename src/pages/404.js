import Head from 'next/head'
import { Box, Center, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Box margin='0 auto' width='100%'>
        <Box position='relative' height='100%'>
          <Header />
          <Search 
            top={{base: '33px', md: '41px'}}
            right={{base: '23px', md: '55px'}}
            marginTop='unset'
            marginRight='unset'
          />
          <Box marginTop={{base: '97px', md: '119px'}}>
            <Center flexDirection='column'>
              <Text
                fontWeight='bold'
                fontSize={{base: '50px', md: '68px'}}
              >
                404
              </Text>
              <Text
                letterSpacing='2.24px'
                fontWeight='normal'
                fontSize={{base: '24px', md: '28px'}}
              >
                NOT FOUND
              </Text>
            </Center>
            <Center 
              flexDirection='column' 
              marginTop={{base: '50px', md: '80px'}}
              fontSize={{base: '14px', md: '16px'}}
              lineHeight={'44px'}
              textAlign='center'
            >
              <Text>
              お探しのページは<br className='sp' />一時的にアクセスできない状況にあるか 
              </Text>
              <Text>
                移動もしくは削除された可能性があります。
              </Text>
            </Center>
            <Center marginTop={{base: '60px', md: '119px'}}>
              <Link href='/'>
                <Center
                  borderRadius='full'
                  border='1px solid white'
                  height={{base: '51px', md: '56px'}}
                  width={{base: '239px', md: '266px'}}
                  fontSize={{base: '16px', md: '20px'}}
                >
                  ALL STORYへ
                </Center>
              </Link>
            </Center>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
