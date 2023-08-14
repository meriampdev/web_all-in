import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { Box, Button, Center, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { isReservedKeyword } from '@/utils'
import NextLink from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'
import { Container } from '@/components/container'

export const JobOffer = ({ isVisible, article }) => {
  const [show, setShow] = useState(false)
  const { data: emotions } = useAxios(`/wp-json/wp/v2/categories?per_page=8&parent=5`)

  useEffect(() => {
    if(!show && isVisible) {
      setShow(true)
    } 
  }, [isVisible])

  return (
    <>
      <Box 
        mt={{base: '81px', md: '136px'}}
        width='100%'
        height={{base: '215px', md: '245px'}}
        bg='black'
        backdropFilter='blur(15px)'
        position='relative'
      >
        <Box
          fontSize={{base: '50px', md: '141px'}}
          lineHeight={{base: '60px', md: '171px'}}
          letterSpacing='8.46px'
          fontWeight='bold'
          textAlign='center'
          color='white'
          opacity='0.1'
        >
          JOB OFFER
        </Box>
        <Center
          position='absolute'
          top='0'
          left='0'
          width='100%'
          flexDirection='column'
          height={{base: '215px', md: '245px'}}
        >
          <Text
            fontSize={{base: '30px', md: '44px'}}
            letterSpacing='2.2px'
            color='white'
            fontWeight='normal'
          >
          この求人に応募する
          </Text>
          <Flex marginTop={{base: '31px', md: '43px'}} gridGap={{base: '12px', md: '36px'}}>
            <Link 
              href={article?.post_acfs?.recruitment_url_link?.url} 
              isExternal
              width={{base: '100%', md: 'fit-content'}}
            >
              <Button
                width={{base: '152px', md: '258px'}}
                height={{base: '36px', md: '46px'}}
                borderRadius='full'
              >
              採用ページへ
              </Button>
            </Link>
            <Link 
              href={`mailto:${article?.post_acfs?.recruitment_email}`} 
              width={{base: '100%', md: 'fit-content'}}
            >
              <Button
                width={{base: '152px', md: '258px'}}
                height={{base: '36px', md: '46px'}}
                borderRadius='full'
              >
                メールで応募する
              </Button>
            </Link>
          </Flex>
        </Center>
      </Box>
      <Center
        transition={'bottom 0.5s ease 0s'}
        position='fixed'
        zIndex='200'
        bottom={{ base: show ? 0 : '-292px', md: show ? 0 : '-136px'}}
        width='100%'
        height={{base: '292px', md: '136px'}}
        pl={{base: '40px', md: '130px'}}
        pr={{base: '10px', md: '100px'}}
        background='transparent linear-gradient(276deg, #000000 0%, #414141 100%) 0% 0% no-repeat padding-box'
        opacity='0.95'
      >
        <Container>
          <Flex 
            position='relative'
            alignItems='center'
            justifyContent='center'
            width='100%'
            flexDirection={{base: 'column', md: 'row'}}
            gridGap={{base: '30px', md: '80px'}}
          >
            <IconButton 
              onClick={() => setShow(false)}
              icon={<CloseIcon fontSize={{ base: '25px', md: '30px'}} />}
              color='white'
              bg='transparent'
              borderRadius='full'
              position='absolute'
              top='0'
              right='0'
              _hover={{ bg: 'transparent', opacity: 0.8 }}
            />
            <Center
              bg='#717171'
              borderRadius='full'
              color='white'
              height={'32px'}
              minWidth={{base: '193px', md: '211px'}}
              width={{base: '193px', md: '211px'}}
              fontSize={'15px'}
            >
              次はどの気分で探す？
            </Center>
            <Flex 
              flexWrap='wrap' 
              pr={{base: '30px', md: 0}}
              justifyContent={{base: 'space-between', md: 'unset'}}
              gridGap={{base: '10px', md: '13px'}}
              maxWidth={{base: 'none', md: '670px'}}
            >
              {emotions?.map((tag, i) => {
                if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return null 
                return (
                  <NextLink 
                    key={`tag-${i}`}
                    href={`/story/category?slug=${tag?.slug}`} 
                    passHref
                  >
                    <Center
                      cursor='pointer'
                      bg='white'
                      minWidth={{ base: '129px', md: '114px'}}
                      height={'38px'}
                      px={'18px'}
                      mr={{base: 0, md: '37px'}}
                      fontSize={{base: '12px', md: '14px'}}
                      color='black'
                      borderRadius='full'
                    >
                      #{tag?.name}
                    </Center>
                  </NextLink>
                )
              })}
            </Flex>
          </Flex>
        </Container>
      </Center>
    </>
  )
}