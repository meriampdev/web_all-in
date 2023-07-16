import axios from 'axios'
import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from './article'
import { WP_ADMIN_ID } from '@/constants'
import { Container } from '@/components/container'

export const AllStories = () => {
  const [list, setList] = useState([])
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 1,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])

  useEffect(() => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&tag=article&number=6`)
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.err('err', err)
      })
  }, [])

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
            {list.map((article) => (
              <Box 
                key={article?.global_ID}  
                className="embla__slide"
                pr={{base: '25px', md: '68px'}}
              >
                <Box 
                  className='embla__slide__inner'
                >
                  <Article key={article?.ID} article={article} />
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
        {list.map((article) => {
          return (
            <Article key={`story-${article?.ID}`} article={article} />
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