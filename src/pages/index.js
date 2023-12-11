import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import IsVisible from 'react-is-visible'
import { Container } from '@/components/container'
import { Box, Center } from '@chakra-ui/react'
import { MainMv } from '@/features/landing/main-mv'
import { Header } from '@/components/header'
import { TopTen } from '@/features/landing/top-ten'
import { Search } from '@/features/landing/search'
import { AllStories } from '@/features/landing/all-story'
import { ByCategory } from '@/features/landing/by-category'
import { Selection } from '@/features/landing/selection'
import { Footer } from '@/components/footer'
import { Featured } from '@/features/landing/featured'
import { AppContainer } from '@/components/app-container'

export default function Home() {
  const [categories, setCategories] = useState({})
  const { data } = useAxios('/wp-json/api/v1/get-top-categories')

  useEffect(() => {
    if(data?.length > 0) {
      let sorted = data.sort((a, b) => {
        return a?.order - b?.order
      })
      let section1 = sorted.slice(0, 1)
      let section2 = sorted.slice(1, 3)
      let remaining = sorted.slice(3, sorted.length)
      setCategories({
        section1: section1[0], 
        section2, 
        remaining
      }) 
    }
  }, [data])


  return (
    <>
      <AppContainer>
        <Box margin='0 auto' width='100%' >
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
          <Box height='100%'>
            <Search />
            
            <Box
              width='100%'
              position='relative'
              _after={{
                position: 'absolute',
                top: 0,
                right: 0,
                content: "''",
                width: { base: 0, md: '7px'},
                height: '100%',
                background: '#707070'
              }}
            > 
              <Container 
                paddingLeft={{base: '20px', md: '132px'}}
                paddingRight={{base: '', md: '128px'}}
              >
                <IsVisible once>
                  {(isVisible) => (
                    <AllStories animate={isVisible} />
                  )}
                </IsVisible>
                {categories?.section1 &&  (
                  <IsVisible once>
                    {(isVisible) => (
                      <ByCategory 
                        animate={isVisible}
                        direction='right'
                        slug={categories?.section1?.slug} 
                        marginTop={{base: '50px', md: '90px'}} 
                      />
                    )}
                  </IsVisible>
                )}
              </Container>
            </Box>

            <IsVisible once>
              {(isVisible) => (
                <Featured animate={isVisible} />
              )}
            </IsVisible>

            <Box
              className='animate slide-right'
              width='100%'
              position='relative'
              _after={{
                position: 'absolute',
                top: 0,
                right: 0,
                content: "''",
                width: { base: 0, md: '7px'},
                height: '100%',
                background: '#707070'
              }}
            > 
              {categories?.section2?.length > 0 && (
                <Container 
                  paddingLeft={{base: '16px', md: '132px'}}
                  paddingRight={{base: '', md: '128px'}}
                >
                  {categories?.section2?.map((cat) => (
                    <IsVisible once>
                      {(isVisible) => (
                        <ByCategory 
                          animate={isVisible}
                          direction='right'
                          slug={cat?.slug} 
                          marginTop={{base: '50px', md: '90px'}} 
                        />
                      )}
                    </IsVisible>
                  ))}
                </Container>
              )}
            </Box>

            <IsVisible once>
              {(isVisible) => (
                <Selection animate={isVisible} />
              )}
            </IsVisible>

            {categories?.remaining?.length > 0 && (
              <Container 
                paddingLeft={{base: '16px', md: '132px'}}
                paddingRight={{base: '16px', md: '128px'}}
              >
                {categories?.remaining?.map((cat) => (
                  <IsVisible once>
                    {(isVisible) => (
                      <ByCategory 
                        animate={isVisible}
                        direction='right'
                        slug={cat?.slug} 
                        marginTop={{base: '50px', md: '90px'}} 
                      />
                    )}
                  </IsVisible>
                ))}
              </Container>
            )}
          </Box>
          <Footer />
        </Box>
      </AppContainer>
    </>
  )
}
