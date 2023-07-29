import axios from 'axios'
import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from '@/features/landing/article'
import { WP_REST_API } from '@/constants'


export const Recommended = ({ slug, ...rest }) => {
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
      .get(`${WP_REST_API}/wp-json/api/v1/articles-selection`)
      .then((response) => {
        setList(response?.data)
      }).catch((err) => {
        console.error('err', err)
      })
  }, [])

  return (
    <Box {...rest}>
      <Box
        height={{base: '36px', md: '77px'}}
        borderLeft='2px solid white'
        paddingLeft={{base: '16px', md: '30px'}}
        fontSize={{base: '22px', md: '45px'}}
        lineHeight={{base: '27px', md: '55px'}}
        marginBottom={{base: '25px', md: '50px'}}
        display='flex'
        alignItems='flex-end'
      >
       おすすめ記事
      </Box>
      <Box className="embla">
        <Box className="embla__viewport" ref={emblaRef}>
          <Box className="embla__container">
            {list.map((article) => (
              <Box 
                key={article?.ID}  
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
    </Box>
  )
}