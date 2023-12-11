import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isReservedKeyword } from '@/utils'
import { format, parseISO } from 'date-fns'
import { Container } from '@/components/container'
import { Box, Button, Center, Flex, Link, Image, Icon, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import { FacebookIcon2 } from '@/components/icons/FacebookIcon2'
import { XTwitterIcon } from '@/components/icons/XTwitterIcon'
import { LineIcon } from '@/components/icons/LineIcon'
import { BIcon } from '@/components/icons/BIcon'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Recommended } from '@/features/landing/recommended'
import { FullPageLoader } from '@/components/loader';
import { WP_REST_API } from '@/constants'
import { ApplicationRequirements } from '@/features/article-detail/application-requirements'
import NextLink from 'next/link'
import IsVisible from 'react-is-visible'
import { JobOffer } from '@/features/article-detail/job-offer'
import { SeoHead } from '@/components/seo-head'
import PocketIcon from '@/assets/images/pocket.png'
import PinterestIcon from '@/assets/images/Pinterest.png'

export default function ArticleDetail() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState(null)
  const [tags, setTagList] = useState([])
  const [nextArticle, setNextArticle] = useState({})
  const [prevArticle, setPrevArticle] = useState({})
  const [shareLinks, setShareLinks] = useState({})

  useEffect(() => {
    let q = window?.location?.origin + router?.asPath
    let fbShare = `${q}&quote=${article?.post_title} %0D%0A${article?.post_excerpt}%0D%0A`
    let twitterShare = `${q}&text=${article?.post_title} %0D%0A${article?.post_excerpt}%0D%0A`

    const articleImage = article?.featured_image_src || article?.featured_image
    setShareLinks({ 
      twitterShare: `https://twitter.com/share?url=${twitterShare}`, 
      fbShare: `https://www.facebook.com/sharer/sharer.php?u=${fbShare}`,
      lineShare: `https://social-plugins.line.me/lineit/share?url=${q}`,
      bpsShare: `https://b.hatena.ne.jp/entry/panel/?url=${q}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${q}&media=${articleImage}&description=umplex`,
      pocket: `https://widgets.getpocket.com/v1/popup?url=${q}`
    })
  }, [article, router])

  useEffect(() => {
    axios
      .get(`${WP_REST_API}/wp-json/wp/v2/categories?per_page=12`)
      .then((response) => {
        if(response?.data?.length > 0) {
          setTagList(response.data)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    
  }, [])

  useEffect(() => {
    setLoading(true)
    if(router?.query?.slug || router?.query?.id) {
      let isDraft = router?.query?.id && router?.query?.preview
      let identifier = router?.query?.slug || router?.query?.id

      axios
        .get(`${WP_REST_API}/wp-json/api/v1/article-by-${isDraft ? 'id' : 'slug'}/${identifier}`)
        .then((response) => {
          setLoading(false)
          if(response?.data?.article?.length > 0) {
            setArticle(response.data?.article[0])
          }
          if(response?.data?.next) {
            setNextArticle(response?.data?.next)
          }
          if(response?.data?.prev) {
            setPrevArticle(response?.data?.prev)
          }
        }).catch((err) => {
          console.log('err', err)
          setLoading(false)
        })
    }
  }, [router?.query])

  const renderSnsIcons = () => (
    <Flex gridGap='17px' alignItems='center' alignSelf={{base: 'center', md: 'unset'}}>
      <Link
        isExternal
        href={shareLinks?.twitterShare}
      >
        <Icon fontSize='20px' as={XTwitterIcon} />
      </Link>
      <Link
        isExternal
        href={shareLinks?.fbShare}
      >
        <Icon fontSize='20px' as={FacebookIcon2} />
      </Link>
      <Link 
        isExternal 
        href={shareLinks?.lineShare}
      >
        <Icon fontSize='20px' as={LineIcon} />
      </Link>
      <Link 
        isExternal
        href={shareLinks?.bpsShare}
      >
        <Icon fontSize='20px' as={BIcon} />
      </Link>
      
      <Link 
        isExternal
        href={shareLinks?.pinterest}
      >
        <Box boxSize='20px'>
          <Image src={PinterestIcon.src} />
        </Box>
      </Link>
      <Link 
        isExternal
        href={shareLinks?.pocket}
      >
        <Box boxSize='30px' mt='3px' ml='-3px'>
          <Image src={PocketIcon.src} />
        </Box>
      </Link>
    </Flex>
  )

  const categories = article?.post_categories ? article?.post_categories?.filter((tag) => {
    if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return false 
    return true
  }) : []

  return (
    <>
      {article && (
        <SeoHead 
          title={`${article?.post_title}｜Umplex`}
          description={article?.excerpt?.rendered || article?.post_excerpt}
        />
      )}
      {loading && <FullPageLoader />}
      <Box margin='0 auto' width='100%'>
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
        
        <Container 
          paddingLeft={{base: '25px', md: '132px'}}
          paddingRight={{base: '25px', md: '128px'}}
        >
          <Box width='100%'>
            <Box 
              marginTop={{base: '139px', md: '112px'}}
              fontSize={{base: '25px', md: '28px'}}
              dangerouslySetInnerHTML={{
                __html: article?.excerpt?.rendered || article?.post_excerpt
              }}
            />
            <Text
              textAlign='left'
              fontSize={{base: '13px', md: '15px'}}
              my={{base: '16px', md: '30px'}}
            >
              {(article?.post_date || article?.date) && format(parseISO(article?.post_date || article?.date), 'yyyy.MM.dd')}
            </Text>
            <Flex
              width='100%'
              flexDirection={{base: 'column', md: 'row'}}
              alignItems={{ base: 'flex-start', md: 'flex-start'}}
              justifyContent='space-between'
              gridGap={{base: '40px', md: '40px'}}
              mb={{base: '40px', md: '80px'}}
            >
              <Flex gridGap='10px' flexWrap='wrap'>
                {categories.map((tag) => {
                  return (
                    <NextLink href={`/story/tag?slug=${tag?.slug}`}>
                      <Center
                        key={`tag-${tag?.term_id}`}
                        height={{base: '28px', md: '30px'}}
                        px={'18px'}
                        fontSize={{base: '12px', md: '14px'}}
                        background='#123E43'
                        color='#39A5B2'
                        borderRadius='full'
                      >
                        #{tag?.name}
                      </Center>
                    </NextLink>
                  )
                })}
              </Flex>
              {renderSnsIcons()}
            </Flex>
            {article?.post_acfs?.animation_link?.url && (
              <Center mb={{base: '20px', md: '63px'}}>
                <Link 
                  href={article?.post_acfs?.animation_link?.url} 
                  isExternal
                >
                  <Button
                    width={{base: '294px', md: '274px'}}
                    height={{base: '48px', md: '46px'}}
                    fontSize={{base: '16px', md: '14px'}}
                    fontWeight='normal'
                    border='1px solid white'
                    borderRadius='full'
                    bg='transparent'
                    color='white'
                    _hover={{
                      bg: 'transparent',
                      opacity: 0.8
                    }}
                  >
                  アニメーションを見る
                  </Button>
                </Link>
              </Center>
            )}
            
          </Box>
        </Container>
        <Box>
          <ApplicationRequirements 
            article={article}
            content={article?.post_acfs?.application_requirements} 
            floatingBtn={true}
          />
          <Container 
            paddingLeft={{base: '0', md: '132px'}}
            paddingRight={{base: '0', md: '128px'}}
            marginTop={{base: '-100px', md: '-120px'}}
          >
            <Box 
              margin='0 auto'
              backgroundColor='#222222'
            >
              <Center width='100%' padding={{base: '22px', md: '60px'}}>
                <Image 
                  width={'100%'}
                  height='100%'
                  objectFit='contain'
                  src={article?.post_acfs?.article_image_content?.url}
                />
              </Center>
            </Box>
          </Container>
          <Container 
            paddingLeft={{base: '25px', md: '132px'}}
            paddingRight={{base: '25px', md: '128px'}}
          >
            {(article?.post_acfs?.recruitment_description) && (
              <Box>
                <Flex 
                  marginTop={{base: '64px', md: '184px'}}
                  flexDirection={{base: 'column', md: 'row'}} 
                  alignItems='center'
                  gridGap={{base: '34px', md: '46px'}}
                >
                  <Box
                    boxSize={{base: '178px', md: '356px'}}
                    minWidth={{base: '178px', md: '356px'}}
                    bg='#e2e2e2'
                  >
                    {article?.post_acfs?.recruitment_image && (
                      <Image 
                        src={article?.post_acfs?.recruitment_image?.url}
                        width={'100%'}
                        height='100%'
                        objectFit='cover'
                      />
                    )}
                  </Box>
                  <Box textAlign={{base: 'center', md: 'unset'}}>
                    <Text 
                      fontSize={{base: '18px', md: '20px'}}
                      marginBottom={{base: '27px', md: '43px'}}
                    >
                      採用担当からの面接ポイントひと言
                    </Text>
                    <Box 
                      margin={{base: '0 auto', md: 'unset'}}
                      marginBottom={{base: '40px', md: '39px'}}
                      width={'70px'}
                      height='2px'
                      bg='white'
                    />
                    <Text 
                      fontSize={{base: '18px', md: '20px'}}
                      marginBottom={{base: '22px', md: '30px'}}
                    >
                      {article?.post_acfs?.recruitment_title}
                    </Text>
                    <Text
                      fontSize={{base: '12px', md: '14px'}}
                      lineHeight={{base: '24px', md: '24px'}}
                    >
                      {article?.post_acfs?.recruitment_description}
                    </Text>
                  </Box>
                </Flex>
                <Center marginTop={{base: '78px', md: '126px'}} width='100%'>
                  <ApplicationRequirements 
                    article={article}
                    content={article?.post_acfs?.application_requirements} 
                  />
                </Center>
              </Box>
            )}
          </Container>
          
          {article && (
            <IsVisible>
              {(isVisible) => (
                <JobOffer 
                  isVisible={isVisible} 
                  article={article}
                />
              )}
            </IsVisible>
          )}

          <Center 
            mt={{base: '72px', md: '77px'}}
            mb={{base: '60px', md: '113px'}}
          >
            {renderSnsIcons()}
          </Center>
          <Container>
            <Center width='100%' justifyContent='space-between' px={{base: '', md: '100px', lg: '150px'}}>
              <NextLink 
                href={`/story/detail?slug=${prevArticle?.post_name}`} 
                passHref
                style={{ pointerEvents: !prevArticle?.post_name ? 'none' : 'all' }}
              >
                <Button
                  isDisabled={!prevArticle?.post_name}
                  bg='transparent'
                  color='white'
                  fontSize={{base: '12px', md: '16px'}}
                  fontWeight='normal'
                  _hover={{
                    bg: 'transparent'
                  }}
                >
                  <ChevronLeftIcon fontSize='40px' />
                  <Text>
                  BEFORE　<Text as='span' className='pc'>会社と出会う</Text>
                  </Text>
                </Button>
              </NextLink>
              <NextLink href='/story/all' passHref>
                <Button
                  cursor='pointer'
                  bg='transparent'
                  color='white'
                  fontSize={{base: '12px', md: '16px'}}
                  fontWeight='normal'
                  _hover={{
                    bg: 'transparent'
                  }}
                >
                  <Text>
                  ALL STORYへ
                  </Text>
                </Button>
              </NextLink>
              <NextLink 
                href={`/story/detail?slug=${nextArticle?.post_name}`} 
                passHref
                style={{ pointerEvents: !nextArticle?.post_name ? 'none' : 'all' }}
              >
                <Button
                  isDisabled={!nextArticle?.post_name}
                  bg='transparent'
                  color='white'
                  fontSize={{base: '12px', md: '16px'}}
                  fontWeight='normal'
                  _hover={{
                    bg: 'transparent'
                  }}
                >
                  <Text>
                  AFTER　<Text as='span' className='pc'>会社と出会う</Text>
                  </Text>
                  <ChevronRightIcon fontSize='40px' />
                </Button>
              </NextLink>
            </Center>
          </Container>
          <Container 
            marginTop={{base: '82px', md: '150px'}}
            paddingLeft={{base: '25px', md: '132px'}}
            paddingRight={{base: '25px', md: '128px'}}
          >
            <Recommended />
          </Container>
          {/* <Box
            position='relative'
            marginTop={{base: '89px', md: '152px'}}
            py={'60px'}
            background='transparent linear-gradient(0deg, #000 0%, #414141 100%) 0% 0% no-repeat padding-box'
          >
            <Center
              position='absolute'
              top='-16px'
              width='100%'
            >
              <Center
                borderRadius='full'
                background='#717171'
                width={{base: '143px', md: '170px'}}
                height={'32px'}
                fontSize={'15px'}
                fontWeight='normal'
              >
                別の気分で探す
              </Center>
            </Center>
            <Center width='100%'>
              <HStack 
                spacing='20px'
                justifyContent='center'
                width='60%'
                flexWrap='wrap'
              >
                {tags?.map((tag,i) => {
                  if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return null 
                  return (
                    <NextLink 
                      key={`tag-${i}`}
                      href={`/story/tag?slug=${tag?.slug}`} 
                      passHref
                    >
                      <Center
                        cursor='pointer'
                        height={{base: '28px', md: '38px'}}
                        px={'18px'}
                        fontSize={{base: '12px', md: '14px'}}
                        color='white'
                        borderRadius='full'
                        border='1px solid white'
                      >
                        #{tag?.name}
                      </Center>
                    </NextLink>
                  )
                })}
              </HStack>
            </Center>
          </Box> */}
          <Footer />
        </Box>
      </Box>
    </>
  )
}
