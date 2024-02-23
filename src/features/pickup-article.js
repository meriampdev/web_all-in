import { 
  Box, 
  Button, 
  Center, 
  Flex, 
  Image, 
  VStack, 
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const PickupArticle = ({ article }) => {
  return (
    <Box 
      position='relative' 
      marginBottom={{base: '40px', md: '115px'}}
      paddingLeft={{base: '16px', md: '30px'}}
    >
      <Center
        position='absolute'
        top={{base: '-14px', md: '-22px'}}
        left={0}
        zIndex='10'
        width={{base: '120px', md: '160px'}}
        height={{base: '35px', md: '44px'}}
        fontSize={{base: '15px', md: '20px'}}
        borderRadius='full'
        background='transparent linear-gradient(90deg, #1A9D93 0%, #4980C1 100%) 0% 0% no-repeat padding-box'
      >
        PICK UP
      </Center>
      <Flex flexDirection={{base: 'column', lg: 'row'}}>
        <Box
          width={{base: '100%', lg: '647px'}}
          height={{base: '235px', md: '460px'}}
        >
          <Image 
            width='100%'
            height='100%'
            objectFit='cover'
            src={article?.featured_image}
          />
        </Box>
        
        <Box
          position='relative'
          flex='1'
          width={{base: '100%', lg: '495px'}}
          height={{base: '215px', md: '460px'}}
          overflow='hidden'
        >
          <Box
            zIndex='1'
            filter='blur(4px)'
            transform='scale(1.1)'
            position='absolute'
            left={{base: '16px', md: '30px'}}
            width='100%'
            height='100%'
            backgroundImage={`url(${article?.featured_image})`}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundPosition='center'
          />
          <VStack 
            position='relative'
            background='transparent linear-gradient(180deg, #000000 0%, #336379 100%) 0% 0% no-repeat padding-box'
            opacity='0.9'
            zIndex='2'
            alignItems='flex-start' 
            spacing={{base: '15px', md: '30px'}}
            width={'100%'}
            height={{base: '215px', md: '460px'}}
            padding={{base: '40px 35px', md: '82px 50px'}}
          >
            <Box fontSize={{base: '18px', md: '25px'}}>
              {article?.title || article?.post_title}
            </Box>
            <Box
              maxWidth={{base: '', md: '300px'}}
              fontSize={{base: '12px', md: '16px'}}
              lineHeight={{base: '15px', md: '30px'}}
              dangerouslySetInnerHTML={{
                __html: article?.excerpt || article?.post_excerpt
              }}
              css={{
                'display': '-webkit-box',
                'WebkitLineClamp': '5',
                'WebkitBoxOrient': 'vertical',
                overflow: 'hidden'
              }}
            />
            <NextLink 
              href={`/story/detail?slug=${article?.post_name || article?.slug}`} 
              passHref
            >
              <Button
                borderRadius='full'
                lineHeight='normal'
                width={{base: '100px', md: '142px'}}
                height={{base: '28px', md: '43px'}}
                fontSize={{base: '13px', md: '16px'}}
                className='ripple-hover'
              >
                WATCH
              </Button>
            </NextLink>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}