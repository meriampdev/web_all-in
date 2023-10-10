import { useAxios } from '@/hooks/useAxios'
import Head from 'next/head'
import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Article } from '@/features/landing/article'
import { FullPageLoader } from '@/components/loader';
import InfiniteScroll from "react-infinite-scroll-component";
import { CategoryContainer } from '@/features/category-container'


export default function AllStories() {
  const { data, loading, hasMore, getMore } = useAxios('/wp-json/api/v1/articles')

  const getMorePost = async () => {
    if(data?.length) {
      getMore(data?.length)
    }
  };

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
        <CategoryContainer data={{name: 'ALL STORY'}}>
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
                ALL STORY
              </Box>
              <InfiniteScroll
                dataLength={data?.length || 0}
                next={getMorePost}
                hasMore={hasMore}
                loader={(
                  <Center width='100%'>
                    <Spinner size='md' />
                  </Center>
                )}
                endMessage={(
                  <Center mt={'100px'} width='100%'>
                    <h4>これ以上見せるものは何もない</h4>
                  </Center>
                )}
                className='article-list'
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {[...(data?.length > 0 ? data : [{ id: 1 }, { id: 2 }, { id: 3 }])]?.map((article, i) => (
                  <Box key={`article-${i}`}>
                    <Article 
                      article={article} 
                      isLoading={loading}
                    />
                  </Box>
                ))}
              </InfiniteScroll>
            </Box>
          </Container>
          <Footer />
        </CategoryContainer>
    </Box>
  </>
  )
}