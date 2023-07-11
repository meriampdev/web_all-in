import axios from 'axios'
import { useEffect, useState } from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import useEmblaCarousel from 'embla-carousel-react'
import { Box, Image } from '@chakra-ui/react'
import { Object } from 'globalthis/implementation'
import { WP_ADMIN_ID } from '@/constants'

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
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&tag=top-ten`)
      .then((response) => {
        let sorted = response?.data?.posts.sort(function (a, b) {
          let ao = 0, bo = 0
          Object.keys(a?.tags).map((tag) => {
            if(tag.includes('t10-order')) {
              ao = tag.replace(`t10-order-`, '')
            }
          })
          Object.keys(b?.tags).map((tag) => {
            if(tag.includes('t10-order')) {
              bo = tag.replace(`t10-order-`, '')
            }
          })
          return ao - bo
        })
        setList(sorted)
      })
      .catch((err) => {
        console.err('error', err)
      })
  }, [])

  return (
    <Box 
      position='absolute'
      bottom='0'
      left='0'
      paddingLeft='50px'
      zIndex='100'
      width='100%'
    >
      <Box
        fontSize={{base: '', lg: '30px'}}
        lineHeight={{base: '', md: '37px'}}
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
                pr={{ base: ' ', md: '22px' }}
              >
                <Box 
                  className='embla__slide__inner'
                  borderRadius='10px'
                  width={{base: '', lg: '250px'}}
                  height={{base: '', lg: '179px'}}
                  position='relative'
                >
                  <Box
                    position='absolute'
                    bottom='0'
                    left='3px'
                    fontSize={{base: '', md: '50px'}}
                    lineHeight='normal'
                    dangerouslySetInnerHTML={{
                      __html: item?.excerpt
                    }}
                  />
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