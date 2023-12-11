import { useAxios } from '@/hooks/useAxios'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Center } from '@chakra-ui/react'
import { Article } from '@/features/landing/article'

export const Selection = ({ animate }) => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    inViewThreshold: 0.5,
    containScroll: 'keepSnaps',
  }, [WheelGesturesPlugin()])
  const { data, loading } = useAxios(`/wp-json/api/v1/articles-selection`)

  return (
    <Box
      animation={animate ? '0.7s forwards 0.2s slide-left-100' : ''}
      marginLeft='100%'
      position='relative'
      marginTop={{base: '66px', md: '97px'}}
      height={{base: '', md: '620px'}}
      paddingLeft={{base: '50px', md: '132px'}}
      borderLeft={{ base: 'none', md: '7px solid #707070'}}
      display='flex'
      alignItems='center'
    >
      <Box
        position='absolute'
        top={{base: '115px', md: '241px'}}
        left={{base: '-150px', md: '-265px'}}
        transform='matrix(0, 1, -1, 0, 0, 0)'
        color='#F4F4F4'
        opacity='0.2'
        letterSpacing='6px'
        fontSize={{base: '50px', md: '100px'}}
      >
      SELECTION
      </Box>
      <Center
        position='absolute'
        top={{ base: '-10px', md: '0'}}
        left={{base: '40px', md: 'unset'}}
        zIndex='10'
        width={{base: '150px', md: '200px'}}
        height={{base: '35px', md: '44px'}}
        fontSize={{base: '15px', md: '20px'}}
        borderRadius='full'
        background='transparent linear-gradient(90deg, #644B93 0%, #314081 100%) 0% 0% no-repeat padding-box'
      >
        厳選シナリオ
      </Center>
      <Box
        width='100%'
        height={{base: '', md: '560px'}}
        padding={{base: '67px 0  67px 38px', md: '90px 0 40px 90px'}}
        borderRadius='10px 0 0 10px'
        opacity='0.8'
        background='transparent linear-gradient(105deg, #000000 0%, #336379 100%) 0% 0% no-repeat padding-box'
      >
        <Box className="embla">
          <Box className="embla__viewport" ref={emblaRef}>
            <Box className="embla__container">
              {[...(data?.length > 0 ? data : [{ id: 1 }, { id: 2 }, { id: 3 }])].map((item, i) => (
                <Box 
                  key={`selection-${i}`}  
                  className="embla__slide"
                  pr={{ base: '20px', md: '40px' }}
                >
                  <Box className='embla__slide__inner'>
                    <Article article={item} isLoading={loading} />
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