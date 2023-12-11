import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { Box, Button, Center, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { isReservedKeyword } from '@/utils'
import NextLink from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'
import { Container } from '@/components/container'

let timer = null
export const JobOffer = ({ isVisible, article }) => {
  const [show, setShow] = useState(false)
  const [userClosed, setUserClosed] = useState(false)
  const { data: emotions } = useAxios(`/wp-json/wp/v2/categories?per_page=8&parent=5`)

  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setShow(isVisible && !userClosed)
    }, 500)
  }, [isVisible, userClosed])

  const handleClose = () => {
    setUserClosed(true)
    setShow(false)
  }

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
              _hover={{
                textDecoration: 'none'
              }}
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
              className="mailtoui"
              href={`mailto:${article?.post_acfs?.recruitment_email}`} 
              rel='nofollow'
              width={{base: '100%', md: 'fit-content'}}
              _hover={{
                textDecoration: 'none'
              }}
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
        zIndex='1001'
        bottom={{ base: show ? 0 : '-500px', md: show ? 0 : '-180px'}}
        width='100%'
        minHeight={{base: '292px', md: '136px'}}
        height='auto'
        py={4}
        pl={{base: '20px', md: '130px'}}
        pr={{base: '20px', md: '100px'}}
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
              onClick={handleClose}
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
              mr={{base: '30px', md: '0'}}
            >
              次はどの気分で探す？
            </Center>
            <Flex flexWrap='wrap' justifyContent={{ base: 'space-between', md: 'unset'}}>
              {emotions?.map((tag, i) => {
                if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return null 
                return (
                  <Flex flexBasis={{base: '47%', md: '33%'}}>
                    <NextLink 
                      key={`tag-${i}`}
                      href={`/story/category?slug=${tag?.slug}`} 
                      passHref
                    >
                      <Box
                        cursor='pointer'
                        minWidth={{ base: 'none', md: '114px'}}
                        height={'38px'}
                        mb={{ base: '13px', md: '0'}}
                        mr={{base: '10px', md: '50px'}}
                        fontSize={{base: '12px', md: '14px'}}
                        color='white'
                        textAlign='left'
                        display='flex'
                        alignItems={{ base: 'flex-start', md: 'center'}}
                        _hover={{ opacity: 0.8 }}
                      >
                        #{tag?.name}
                      </Box>
                    </NextLink>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        </Container>
      </Center>
    </>
  )
}