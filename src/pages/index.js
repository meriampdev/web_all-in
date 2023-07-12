import Head from 'next/head'
import { Container } from '@/components/container'
import { Box, Center, Text } from '@chakra-ui/react'
import { MainMv } from '@/features/landing/main-mv'
import { Header } from '@/components/header'
import { TopTen } from '@/features/landing/top-ten'
import { Search } from '@/features/landing/search'
import { AllStories } from '@/features/landing/all-story'
import { ByCategory } from '@/features/landing/by-category'
import { Selection } from '@/features/landing/selection'
import { Footer } from '@/components/footer'
import { Featured } from '@/features/landing/featured'

export default function Home() {
  return (
    <>
      <Head>
        <title>All-In Theater</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box 
          position='relative' 
          width='100%' 
          height='844px'
        >
          <Box 
            position='relative'
            width='100%'
            height={{base: '', xl: '690px'}}
          >
            <Header />
            <Center 
              position='absolute'
              flexDirection='column'
              top='17px'
              left='0'
              zIndex='4'
              width='100%'
              height={{base: '', lg: '567px'}}
            >
              <Center
                border='1px solid white'
                borderRadius='full'
                width={{base: '', lg: '285px'}}
                height={{base: '', lg: '285px'}}
                fontSize={{base: '', md: '22px'}}
                lineHeight={{base: '', md: '37px'}}
              />
            </Center>
            <MainMv />
          </Box>
          <TopTen />
        </Box>
        <Box position='relative' height='100%'>
          <Search />
          <Box 
            paddingLeft={{base: '', md: '132px'}}
            paddingRight={{base: '', md: '128px'}}
            borderRight='7px solid #707070'
          >
            
            <AllStories />
            <ByCategory slug='emotion' marginTop={{base: '', md: '90px'}} />
          </Box>

          <Featured />

          <Box 
            paddingLeft={{base: '', md: '132px'}}
            paddingRight={{base: '', md: '128px'}}
            borderRight='7px solid #707070'
          >
            <ByCategory slug='area' marginTop={{base: '', md: '90px'}} />
            <ByCategory slug='job-type' marginTop={{base: '', md: '90px'}} />
          </Box>

          <Selection />

          <Box 
            paddingLeft={{base: '', md: '132px'}}
            paddingRight={{base: '', md: '128px'}}
            borderRight='7px solid #707070'
          >
            <ByCategory slug='emotion' marginTop={{base: '', md: '90px'}} />
            <ByCategory slug='emotion' marginTop={{base: '', md: '90px'}} />
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  )
}
