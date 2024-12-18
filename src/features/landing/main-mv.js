import { useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";
import { Box, Button, Center, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { CenterPulse } from '@/features/landing/center-pulse'
import { FullPageLoader } from '@/components/loader';
import NextLink from 'next/link'

export const MainMv = () => {
  const [active, setActive] = useState(0)
  const { data, loading } = useAxios('/wp-json/api/v1/get-hot-tags')
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "unset",
        }
      }
    ],
    arrows: true,
    nextArrow: <ChevronRightIcon color='white' width='40px' height='auto' />,
    prevArrow: <ChevronLeftIcon color='white' width='40px' height='auto' />,
    afterChange: current => setActive(current),
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <Box 
        position="absolute"
        top='0'
        left='0'
        zIndex='4'
        backgroundImage={`url("${data?.length > 0 ? data[active]?.tagImageSrc : ''}")`}
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundPosition='center'
        height={{base: '700px', xl: '690px'}}
        width='100%'
        transition='background 0.1s linear'
        css={{
          '@media screen and (max-width: 500px)': {
            backgroundImage: `url("${data?.length > 0 ? data[active]?.spTagImageSrc || data[active]?.tagImageSrc : ''}")`
          }
        }}
      >
        <Center 
          width='100%' 
          position='absolute'
          zIndex='7'
          top={{ base: '162px', md: '119px'}}
          fontSize={{base: '', md: '25px'}}
        >
          HOT TAG
        </Center>
        <CenterPulse />
        <Box
          position='absolute'
          top='0'
          left='0'
          width='100%'
          height='100%'
          zIndex='7'
          css={{
            '& .chakra-icon.slick-arrow:hover': {
              color: 'white',
              opacity: 0.7
            },
            '& .slick-center': {
              '& .tag': {
                fontSize: '25px'
              }
            },
            '& .slick-prev': {
              top: '300px',
              left: '33%',
              zIndex: 7
            },
            '& .slick-next': {
              top: '300px',
              right: '33%',
              zIndex: 7
            }
          }}
        >
          {data?.length > 0 && (
            <Slider {...settings}>
              {data?.map((item) => {
                return (
                  <Box 
                    key={item?.slug} 
                    zIndex='5'
                    position="relative"
                    width='100%' 
                    height={{base: '700px', xl: '690px'}}
                  >
                    <Center 
                      position='absolute'
                      flexDirection='column'
                      top={{ base: '209px', md: '170px', lg: '17px'}}
                      left='0'
                      zIndex='4'
                      width='100%'
                      height={{base: '260px', lg: '567px'}}
                    >
                      <Center
                        className='tag'
                        borderRadius='full'
                        width={{base: '260px', lg: '285px'}}
                        height={{base: '260px', lg: '285px'}}
                        fontSize={{base: '20px', md: '17px'}}
                      >
                        <Text 
                          maxWidth='100%'
                          whiteSpace={'nowrap'}
                          overflow='hidden'
                          textOverflow='ellipsis'
                        >
                          # {item?.name}
                        </Text>
                      </Center>
                    </Center>
                  </Box>
                )
              })}
            </Slider>
          )}
        </Box>
        <Box 
          position='absolute'
          top='0'
          left='0'
          zIndex='1'
          width='100%'
          height='100%'
          background='#000000 0% 0% no-repeat padding-box'
          mixBlendMode='multiply'
          opacity='0.5'
        />
        <Center 
          width='100%' 
          height={{base: '42px', md: '48px'}}
          position='absolute'
          zIndex='7'
          bottom='175px'
        >
          {data?.length > 0 && (
            <NextLink href={`/story/category?slug=${data[active]?.slug}`} passHref>
              <Button
                borderRadius='full'
                lineHeight='normal'
                width={{base: '134px', md: '158px'}}
                height={{base: '42px', md: '48px'}}
                fontSize={{base: '18px', md: '20px'}}
                transition={'all 0.2s ease-in'}
                className='ripple-hover'
              >
                WATCH
              </Button>
            </NextLink>
          )}
        </Center>
      </Box>
    </>
  )
}