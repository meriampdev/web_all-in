import { useAxios } from '@/hooks/useAxios'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Flex, HStack, SkeletonText, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from '@/features/landing/article'
import NextLink from 'next/link'

export const ByCategory = ({ slug, animate, direction, ...rest }) => {
  const { data, loading } = useAxios(`/wp-json/api/v1/articles-by-category/${slug}`)
  const { data: category, loading: loadingCatData } = useAxios(`/wp-json/api/v1/term/category/${slug}`)
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 1,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])

  return (
    <Box {...rest}>
      <SkeletonText 
        noOfLines={1} 
        width={loadingCatData ? '120px' : 'fit-content'}
        skeletonHeight={{base: '22px', md: '45px'}}
        marginBottom={{base: '25px', md: '50px'}}
        isLoaded={loadingCatData === false}
      >
        <NextLink href={`/story/category?slug=${slug}`} passHref>
          <Box
            // animation={animate ? `1.5s slide-${direction}` : ''}
            minWidth='100%'
            height={{base: '36px', md: '77px'}}
            borderLeft='2px solid white'
            paddingLeft={{base: '16px', md: '30px'}}
            fontSize={{base: '22px', md: '45px'}}
            lineHeight={{base: '27px', md: '55px'}}
            marginBottom={{base: '25px', md: '50px'}}
            display='flex'
            alignItems='flex-end'
          >
            #{category?.name}
          </Box>
        </NextLink>
      </SkeletonText>
      <Box 
        className="embla"
        // animation={animate ? `2s slide-${direction}` : ''}
      >
        <Box className="embla__viewport" ref={emblaRef}>
          <Box className="embla__container">
            {[...(data?.length > 0 ? data : [{ id: 1 }, { id: 2 }, { id: 3 }])]?.map((article, i) => (
              <Box 
                key={`article-${i}`}  
                className="embla__slide"
                pr={{base: '25px', md: '68px'}}
              >
                <Box 
                  className='embla__slide__inner'
                >
                  <Article 
                    article={article} 
                    isLoading={loading}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Flex 
        justifyContent='flex-end' 
        marginTop={{base: '20px', md: '50px'}}
      >
        <NextLink href={`/story/category?slug=${slug}`} passHref>
          <Button 
            height={'43px'}
            width={'138px'}
            mr={{base: '16px', md: 0}}
            borderRadius='full'
            bg='white'
          >
            <HStack width='100%' justifyContent='center'>
              <Text>MORE</Text>
              <ChevronRightIcon fontSize='20px' />
            </HStack>
          </Button>
        </NextLink>
      </Flex>
    </Box>
  )
}