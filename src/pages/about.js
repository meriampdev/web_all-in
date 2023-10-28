import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import NextLink from 'next/link'
import AboutImage from '@/assets/images/about-GIF.gif'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FullPageLoader } from '@/components/loader';
import { WP_REST_API } from '@/constants'

export default function About() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${WP_REST_API}/wp-json/wp/v2/contents?slug=about-page`)
      .then((response) => {
        setLoading(false)
        if(response?.data?.length > 0) {
          setData(response.data[0])
        }
      }).catch((err) => {
        console.log('err', err)
        setLoading(false)
      })
    
  }, [])

  return (
    <>
      {loading && <FullPageLoader />}
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
                  src={data?.content_image || AboutImage?.src}
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
                whiteSpace='nowrap'
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
              {data?.acf?.title}
              </Text>
             
              <Box 
                mt={{ base: '20px', md: '30px'}}
                mb={{ base: '40px', md: '60px'}}
                height='2px'
                width='100px'
                background='white'
              />
              {data?.acf?.content_title && 
                <Box
                  fontSize={{base: '10px', md: '14px'}}
                  lineHeight={'30px'}
                  maxWidth={{base: '100%', md: '520px'}}
                >
                  <Text
                    fontSize={{base: '', md: '32px'}}
                    textDecoration='underline'
                  >
                    {data?.acf?.content_title}
                  </Text> <br />
                </Box>
              }
              <Box
                fontSize={{base: '10px', md: '14px'}}
                lineHeight={'30px'}
                maxWidth={{xl: '520px'}}
                dangerouslySetInnerHTML={{
                  __html: data?.acf?.content_body?.replaceAll('\n', '<br />')
                }}
              />
              {data?.acf?.content_link?.url && 
                <NextLink 
                  href={data?.acf?.content_link?.url} 
                  passHref 
                  target={data?.acf?.content_link?.target || "_blank"}
                >
                  <Text 
                    fontSize={{ base: '12px', md: '16px'}}
                    mt={{base: '72px', md: '166px'}}
                  >
                    {data?.acf?.content_link?.title} <ChevronRightIcon fontSize='20px' />
                  </Text>
                </NextLink>
              }
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
