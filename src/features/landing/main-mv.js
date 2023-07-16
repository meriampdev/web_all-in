import axios from 'axios'
import { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";
import { Box, Button, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { CenterPulse } from '@/features/landing/center-pulse'
import { isMobile } from '@/utils/screen';

export const MainMv = () => {
  const [list, setList] = useState([])
  const [active, setActive] = useState(0)
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: isMobile() ? 1 : 3,
    arrows: true,
    nextArrow: <ChevronRightIcon color='white' width='40px' height='auto' />,
    prevArrow: <ChevronLeftIcon color='white' width='40px' height='auto' />,
    afterChange: current => setActive(current),
  };

  useEffect(() => {
    axios
      .get('https://public-api.wordpress.com/rest/v1.1/read/tags/hot-tag/posts?pretty=true')
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.err('err', err)
      })
  }, [])

  return (
    <Box 
      position="absolute"
      top='0'
      left='0'
      zIndex='4'
      backgroundImage={`url("${list[active]?.featured_image}")`}
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
      height={{base: '700px', xl: '690px'}}
      width='100%'
      transition='background 0.4s linear'
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
        <Slider {...settings}>
          {list.map((item) => {
            return (
              <Box 
                key={item?.global_ID} 
                zIndex='5'
                position="relative"
                width='100%' 
                height={{base: '700px', xl: '690px'}}
              >
                <Center 
                  position='absolute'
                  flexDirection='column'
                  top={{ base: '209px', md: '17px'}}
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
                    # {item?.title}
                  </Center>
                </Center>
              </Box>
            )
          })}
        </Slider>
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
        <Button
          borderRadius='full'
          lineHeight='normal'
          width={{base: '134px', md: '158px'}}
          height={{base: '42px', md: '48px'}}
          fontSize={{base: '18px', md: '20px'}}
        >
          WATCH
        </Button>
      </Center>
    </Box>
  )
}