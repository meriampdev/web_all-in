import { useAxios } from '@/hooks/useAxios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Box, Flex, SkeletonText, Text } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Article } from '@/features/landing/article'
import { FullPageLoader } from '@/components/loader';
import { CategoryContainer } from '@/features/category-container'

export default function PerCategory() {
  const router = useRouter()
  const slug = router?.query?.slug
  const { data, loading } = useAxios(`/wp-json/api/v1/articles-by-category/${slug}`, { skip: !slug })
  const { data: tagData, loading: loadingTermData } = useAxios(`/wp-json/api/v1/term/category/${slug}`, { skip: !slug })

  return (
    <>
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
        <CategoryContainer data={tagData}>
          <Container 
            marginTop={{base: '80px', md: '100px'}}
            paddingLeft={{base: '25px', md: '132px'}}
            paddingRight={{base: '25px', md: '128px'}}
            paddingBottom={{base: '25px', md: '128px'}}
            _after={{
              position: 'absolute',
              top: 0,
              right: 0,
              content: "''",
              width: '7px',
              height: '100%',
              background: '#707070'
            }}
          >
            <Box>
              <SkeletonText 
                noOfLines={1} 
                width={loadingTermData ? '120px' : 'fit-content'}
                skeletonHeight={{base: '22px', md: '45px'}}
                marginBottom={{base: '25px', md: '50px'}}
                isLoaded={loadingTermData === false}
              >
                <Box
                  height={{base: '36px', md: '77px'}}
                  borderLeft='2px solid white'
                  paddingLeft={{base: '16px', md: '30px'}}
                  fontSize={{base: '22px', md: '45px'}}
                  lineHeight={{base: '27px', md: '55px'}}
                  marginBottom={{base: '25px', md: '70px'}}
                  display='flex'
                  alignItems='flex-end'
                >
                  #{tagData?.name}
                </Box>
              </SkeletonText>
              {!loading && data?.length <= 0 ? (
                <Text fontSize='lg'>記事が存在しません</Text>
              ) : (
                <Flex flexWrap='wrap' gridGap={{base: '25px', md: '68px'}}>
                  {[...(data?.length > 0 ? data : [{ id: 1 }, { id: 2 }, { id: 3 }])]?.map((article, i) => (
                    <Box key={`article-${i}`}>
                      <Article 
                        article={article} 
                        isLoading={loading}
                      />
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
        </Container>
        <Footer />
      </CategoryContainer>
    </Box>
  </>
)}