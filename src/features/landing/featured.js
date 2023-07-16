import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box, Button, Center, Flex, Image, VStack } from '@chakra-ui/react'
import { WP_ADMIN_ID } from '@/constants'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const Featured = () => {
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    inViewThreshold: 1,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [WheelGesturesPlugin()])
  const [list, setList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&tag=featured&number=5`)
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.error('err', err)
      })
  }, [])

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
  }, [embla, setScrollSnaps, onSelect, list]);

  const scrollPrev = useCallback(
    () => embla && embla.scrollPrev(),
    [embla, list]
  )

  const scrollNext = useCallback(
    () => embla && embla.scrollNext(),
    [embla, list]
  )

  return (
    <Box
      position='relative'
      marginTop={{base: '66px', md: '129px'}}
      height={{base: '477px', md: '620px'}}
      paddingLeft={{base: '50px', md: '132px'}}
      borderLeft={{ base: 'none', md: '7px solid #707070'}}
      display='flex'
      alignItems='center'
    >
      <Box
        position='absolute'
        top={{base: '115px', md: '241px'}}
        left={{base: '-140px', md: '-250px'}}
        transform='matrix(0, 1, -1, 0, 0, 0)'
        color='#F4F4F4'
        opacity='0.2'
        letterSpacing='6px'
        fontSize={{base: '50px', md: '100px'}}
      >
      FEATURED
      </Box>
      
      <Box
        position='relative'
        width='100%'
        height={{base: '', md: '460px'}}
      >
        <Center
          position='absolute'
          top={{base: '-14px', md: '-22px'}}
          left={{base: '-4px', md: '-30px'}}
          zIndex='10'
          width={{base: '120px', md: '160px'}}
          height={{base: '35px', md: '44px'}}
          fontSize={{base: '15px', md: '20px'}}
          borderRadius='full'
          background='transparent linear-gradient(90deg, #1A9D93 0%, #4980C1 100%) 0% 0% no-repeat padding-box'
        >
          特集記事
        </Center>
        <Center
          onClick={scrollPrev}
          cursor='pointer'
          position='absolute'
          top={{ base: `48%`, md: `calc(50% - 25px)`}}
          left={{ base: '-15px', md: '-25px'}}
          zIndex='10'
          bg='white'
          borderRadius='full'
          width={{base: '', md: '50px'}}
          height={{base: '', md: '50px'}}
        >
          <ChevronLeftIcon color='black' fontSize='30px' />
        </Center>
        <Center
          onClick={scrollNext}
          cursor='pointer'
          position='absolute'
          top={{ base: `48%`, md: `calc(50% - 25px)`}}
          right='45px'
          zIndex='10'
          bg='white'
          borderRadius='full'
          width={{base: '', md: '50px'}}
          height={{base: '', md: '50px'}}
        >
          <ChevronRightIcon color='black' fontSize='30px' />
        </Center>
        <Box
          position='absolute'
          zIndex='10'
          right={{base: '132px', md: '250px'}}
          bottom={{base: '20px', md: '22px'}}
          display='flex'
          flexDirection='row'
        >
          {scrollSnaps.map((_, index) => {
            return (
              <Center boxSize='18px'>
                <Box 
                  boxSize='5px'
                  borderRadius='full'
                  backgroundColor={index === selectedIndex ? 'white' : '#ADADAD'}
                />
              </Center>
            )
          })}
        </Box>
        <Box className="embla">
          <Box className="embla__viewport" ref={emblaRef}>
            <Box className="embla__container">
              {list.map((item) => (
                <Box 
                  key={`featured-${item?.global_ID}`}  
                  className="embla__slide"
                >
                  <Box className='embla__slide__inner'>
                    <Flex flexDirection={{base: 'column', md: 'row'}}>
                      <Box
                        width={{base: '325px', md: '647px'}}
                        height={{base: '235px', md: '460px'}}
                        borderTopLeftRadius={{ base: 0, md: '10px'}}
                        borderBottomLeftRadius={{ base: 0, md: '10px'}}
                      >
                        <Image 
                          width='100%'
                          height='100%'
                          objectFit='cover'
                          borderTopLeftRadius={{ base: 0, md: '10px'}}
                          borderBottomLeftRadius={{ base: 0, md: '10px'}}
                          src={item?.featured_image}
                        />
                      </Box>
                      
                      <Box
                        backgroundImage={`url(${item?.featured_image})`}
                        backgroundRepeat='no-repeat'
                        backgroundSize='cover'
                        backgroundPosition='center'
                        borderBottomLeftRadius={{ base: '10px', md: 0}}
                      >
                        <VStack 
                          alignItems='flex-start' 
                          spacing={{base: '15px', md: '30px'}}
                          background='transparent linear-gradient(180deg, #000000 0%, #336379 100%) 0% 0% no-repeat padding-box'
                          opacity='0.8'
                          backdropFilter='blur(15px)'
                          width={{base: '325px', md: '495px'}}
                          height={{base: '215px', md: '460px'}}
                          padding={{base: '40px 35px', md: '82px 50px'}}
                          borderBottomLeftRadius={{ base: '10px', md: 0}}
                        >
                          <Box fontSize={{base: '18px', md: '25px'}}>
                            {item?.title}
                          </Box>
                          <Box
                            maxWidth={{base: '', md: '300px'}}
                            fontSize={{base: '12px', md: '16px'}}
                            lineHeight={{base: '15px', md: '30px'}}
                            dangerouslySetInnerHTML={{
                              __html: item?.excerpt
                            }}
                            css={{
                              'display': '-webkit-box',
                              'WebkitLineClamp': '5',
                              'WebkitBoxOrient': 'vertical',
                              overflow: 'hidden'
                            }}
                          />
                          <Button
                            borderRadius='full'
                            lineHeight='normal'
                            width={{base: '100px', md: '142px'}}
                            height={{base: '28px', md: '43px'}}
                            fontSize={{base: '13px', md: '16px'}}
                          >
                            WATCH
                          </Button>
                        </VStack>
                      </Box>
                    </Flex>
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