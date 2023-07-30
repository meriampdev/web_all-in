import { useAxios } from '@/hooks/useAxios'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import useEmblaCarousel from 'embla-carousel-react'
import { Box, Image, Skeleton } from '@chakra-ui/react'

export const TopTen = () => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 0.5,
    containScroll: 'keepSnaps',
  }, [WheelGesturesPlugin()])
  const { data, loading } = useAxios('/wp-json/api/v1/articles-by-tag/top10')

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
            {[...(data?.length > 0 ? data : [{ id: 1 }, { id: 2 }, { id: 3 }])]?.map((item) => (
              <Box 
                key={item?.id}  
                className="embla__slide"
                pr={{ base: '24px', md: '22px' }}
              >
                <Skeleton 
                  width={{base: '195px', lg: '250px'}}
                  height={{base: '140px', lg: '179px'}}
                  isLoaded={loading === false}
                  borderRadius='10px'
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
                </Skeleton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}