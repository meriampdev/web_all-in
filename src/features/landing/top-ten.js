import axios from 'axios'
import { useEffect, useState } from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import useEmblaCarousel from 'embla-carousel-react'
import { Box, Image } from '@chakra-ui/react'
import { WP_REST_API } from '@/constants'

export const TopTen = () => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 0.5,
    containScroll: 'keepSnaps',
  }, [WheelGesturesPlugin()])
  const [list, setList] = useState([])

  useEffect(() => {
    axios
      .get(`${WP_REST_API}/wp-json/api/v1/articles-by-tag/top10`)
      .then((response) => {
        // let sorted = response?.data?.posts.sort(function (a, b) {
        //   let ao = 0, bo = 0
        //   Object.keys(a?.tags).map((tag) => {
        //     if(tag.includes('t10-order')) {
        //       ao = tag.replace(`t10-order-`, '')
        //       a['order'] = ao
        //     }
        //   })
        //   Object.keys(b?.tags).map((tag) => {
        //     if(tag.includes('t10-order')) {
        //       bo = tag.replace(`t10-order-`, '')
        //       b['order'] = bo
        //     }
        //   })
        //   return ao - bo
        // })
        setList(response?.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }, [])

  return (
    <Box 
      position='absolute'
      bottom='0'
      left='0'
      paddingLeft={{ base: '20px', md: '50px'}}
      zIndex='100'
      width='100%'
    >
      <Box
        fontSize={{base: '25px', lg: '30px'}}
        lineHeight={{base: '30px', md: '37px'}}
      >
        TOP 10
      </Box>
      <Box className="embla">
        <Box className="embla__viewport" ref={emblaRef}>
          <Box className="embla__container">
            {list.map((item) => (
              <Box 
                key={item?.global_ID}  
                className="embla__slide"
                pr={{ base: '24px', md: '22px' }}
              >
                <Box 
                  className='embla__slide__inner'
                  borderRadius='10px'
                  width={{base: '195px', lg: '250px'}}
                  height={{base: '140px', lg: '179px'}}
                  position='relative'
                >
                  <Box
                    position='absolute'
                    bottom='0'
                    left='3px'
                    fontSize={{base: '37px', md: '50px'}}
                    lineHeight='normal'
                  >
                    {item?.post_acfs?.order}
                  </Box>
                  <Image 
                    src={item?.featured_image}
                    borderRadius='10px'
                    height='100%'
                    width='100%'
                    objectFit='cover'
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}