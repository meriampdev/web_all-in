import { useAxios } from '@/hooks/useAxios'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import useEmblaCarousel from 'embla-carousel-react'
import IsVisible from 'react-is-visible'
import { Box, Image, Skeleton } from '@chakra-ui/react'
import NextLink from 'next/link'

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
            {[...(data?.length > 0 ? data : [])]?.map((item) => {
              return (
                <IsVisible once>
                  {(isVisible) => (
                    <NextLink 
                      key={item?.id}  
                      href={`/story/detail?slug=${item?.post_name || item?.slug}`} 
                    >
                      <Box 
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
                            overflow='hidden'
                            className={(isVisible && loading === false) ? 'inview' : ''}
                            css={{
                              '&.inview': {
                                '&::before': {
                                  width: 0
                                },
                                '&::after': {
                                  opacity: 0
                                }
                              },
                              '&:hover::after': {
                                opacity: '1',
                                transition: 'opacity 0.3s',
                                width: '100%',
                              }
                            }}
                            _before={{
                              backgroundColor: '#000',
                              content: "''",
                              display: 'block',
                              borderRadius: '10px',
                              width: '100%',
                              height: {base: '152px', md: '209px'},
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              zIndex: 200,
                              transition: 'width 0.6s ease-out 0.5s'
                            }}
                            _after={{
                              backgroundColor: 'rgba(255,255,255,0.5)',
                              content: "''",
                              display: 'block',
                              borderRadius: '10px',
                              width: '100%',
                              height: {base: '152px', md: '209px'},
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              zIndex: 200,
                            }}
                          >
                            <Box
                              position='absolute'
                              bottom='0'
                              left={{ base: '10px', md: '12px'}}
                              fontSize={{base: '37px', md: '50px'}}
                              lineHeight={{base: '37px', md: '50px'}}
                              background='rgba(0,0,0,0.3)'
                              borderTopRadius='sm'
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
                    </NextLink>
                  )}
                </IsVisible>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}