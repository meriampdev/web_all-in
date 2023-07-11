import axios from 'axios'
import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Center } from '@chakra-ui/react'
import { Article } from '@/features/landing/article'
import { WP_ADMIN_ID } from '@/constants'

export const Selection = () => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 0.5,
    containScroll: 'keepSnaps',
  }, [WheelGesturesPlugin()])
  const [list, setList] = useState([])

  useEffect(() => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&tag=selected&number=10`)
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.error('err', err)
      })
  }, [])

  return (
    <Box
      position='relative'
      marginTop={{base: '', md: '97px'}}
      height={{base: '', md: '620px'}}
      paddingLeft={{base: '', md: '132px'}}
      borderLeft='7px solid #707070'
      display='flex'
      alignItems='center'
    >
      <Box
        position='absolute'
        top={{base: '', md: '241px'}}
        left={{base: '', md: '-250px'}}
        transform='matrix(0, 1, -1, 0, 0, 0)'
        color='#F4F4F4'
        opacity='0.2'
        letterSpacing='6px'
        fontSize={{base: '', md: '100px'}}
      >
      SELECTION
      </Box>
      <Center
        position='absolute'
        top='0'
        zIndex='10'
        width={{base: '', md: '200px'}}
        height={{base: '', md: '44px'}}
        fontSize={{base: '', md: '20px'}}
        borderRadius='full'
        background='transparent linear-gradient(90deg, #644B93 0%, #314081 100%) 0% 0% no-repeat padding-box'
      >
        厳選シナリオ
      </Center>
      <Box
        width='100%'
        height={{base: '', md: '560px'}}
        padding={{base: '', md: '90px 0 90px 90px'}}
        borderRadius='10px 0 0 10px'
        opacity='0.8'
        background='transparent linear-gradient(105deg, #000000 0%, #336379 100%) 0% 0% no-repeat padding-box'
      >
        <Box className="embla">
          <Box className="embla__viewport" ref={emblaRef}>
            <Box className="embla__container">
              {list.map((item) => (
                <Box 
                  key={item?.global_ID}  
                  className="embla__slide"
                  pr={{ base: ' ', md: '40px' }}
                >
                  <Box className='embla__slide__inner'>
                    <Article article={item} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}