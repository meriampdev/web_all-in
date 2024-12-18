import { useAxios } from '@/hooks/useAxios'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from './article'
import NextLink from 'next/link'

export const AllStories = ({ animate }) => {
  const { data, loading } = useAxios('/wp-json/api/v1/articles')
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 1,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])

  return (
    <Box>
      <NextLink href={`/story/all`} passHref>
        <Box
          // animation={animate ? '1.5s slide-right' : ''}
          minWidth='100%'
          height={{base: '36px', md: '77px'}}
          borderLeft='2px solid white'
          paddingLeft={{base: '16px', md: '30px'}}
          fontSize={{base: '25px', md: '50px'}}
          lineHeight={{base: 'normal', md: '61px'}}
          marginBottom={{base: '25px', md: '50px'}}
          display='flex'
          alignItems='flex-end'
        >
          ALL STORY 
        </Box>
      </NextLink>
      <Box 
        className={`embla`}
        display={{base: 'block', md: 'none'}}
      >
        <Box className="embla__viewport" ref={emblaRef}>
          <Box className="embla__container">
            {[...(
              data?.length > 0 ? 
                data 
              : 
                [{ id: 1 }, { id: 2 }, { id: 3 },
                  { id: 1 }, { id: 2 }, { id: 3 }]
              )]?.map((article) => (
              <Box 
                key={article?.slug}  
                className="embla__slide"
                pr={{base: '25px', md: '68px'}}
              >
                <Box className='embla__slide__inner'>
                  <Article 
                    key={article?.slug} 
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
        // animation={animate ? '2s slide-right' : ''}
        flexWrap='wrap'
        minWidth='100%'
        display={{base: 'none', md: 'flex'}}
        gridGap={{base: '25px', md: '68px'}}
      >
        {[...(
          data?.length > 0 ? 
            data 
          : 
            [{ id: 1 }, { id: 2 }, { id: 3 },
              { id: 1 }, { id: 2 }, { id: 3 }]
          )]?.map((article) => {
          return (
            <Article 
              key={article?.slug} 
              article={article} 
              isLoading={loading}
            />
          )
        })}
      </Flex>
      <Flex 
        justifyContent='flex-end'
        marginTop={{base: '20px', md: '50px'}}
      >
        <NextLink href={`/story/all`} passHref>
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