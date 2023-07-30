import { useAxios } from '@/hooks/useAxios'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from './article'

export const AllStories = () => {
  const { data, loading } = useAxios('/wp-json/wp/v2/articles?per_page=6')
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
      <Box
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
      <Box className="embla" display={{base: 'block', md: 'none'}}>
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
        flexWrap='wrap'
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
      <Flex display={{base: 'none', md: 'flex'}} justifyContent='flex-end' marginTop={{base: '', md: '50px'}}>
        <Button 
          height={{base: '', md: '43px'}}
          width={{base: '', md: '138px'}}
          borderRadius='full'
          bg='white'
        >
          <HStack width='100%' justifyContent='center'>
            <Text>MORE</Text>
            <ChevronRightIcon fontSize='20px' />
          </HStack>
        </Button>
      </Flex>
    </Box>
  )
}