import { isReservedKeyword } from '@/utils'
import IsVisible from 'react-is-visible'
import { Box, Center, Flex, Image, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Article = ({ article, isLoading, articleList = false }) => {

  return (
    <IsVisible once>
      {(isVisible) => (
        <NextLink 
          href={`/story/detail?slug=${article?.post_name || article?.slug}`} 
          paddingBottom={{ base: '35px', md: '30px'}}
        >
          <VStack
            width={{base: articleList ? 'auto' : '230px', md: '292px'}}
            paddingBottom={{ base: '35px', md: '30px'}}
            alignItems='flex-start'
            spacing={articleList ? '15.65px' : '20px'}
            position='relative'
          >
            <Skeleton
              width='100%'
              height={{base: articleList ? '99.35px' : '152px', md: '209px'}}
              isLoaded={isLoading === false}
            >
              <Box
                width='100%'
                height={{base: articleList ? '99.35px' : '152px', md: '209px'}}
                borderRadius='10px'
                className={isVisible ? 'inview' : ''}
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
                  borderRadius: '9px',
                  width: '100%',
                  height: {base: articleList ? '99.35px' : '152px', md: '209px'},
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
                  borderRadius: '9px',
                  width: '100%',
                  height: {base: articleList ? '99.35px' : '152px', md: '209px'},
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 200,
                }}
              >
                <Image 
                  src={article?.featured_image_src || article?.featured_image} 
                  width='100%'
                  height='100%'
                  objectFit='cover'
                  borderRadius='10px'
                />
              </Box>
            </Skeleton>
            <SkeletonText 
              noOfLines={3} 
              width='100%'
              skeletonHeight={'2'}
              isLoaded={isLoading === false}
            >
              <Box
                fontSize={{base: '13px', md: '16px'}}
                lineHeight={{base: '24px', md: '24px'}}
                letterSpacing={{base: '', md: '1.28px'}}
                height={'48px'}
                dangerouslySetInnerHTML={{
                  __html: article?.excerpt?.rendered || article?.post_excerpt
                }}
                css={{
                  'display': '-webkit-box',
                  'WebkitLineClamp': '2',
                  'WebkitBoxOrient': 'vertical',
                  overflow: 'hidden'
                }}
              />
            </SkeletonText>
            <Flex 
              flexWrap='wrap' 
              gridGap='5px' 
              maxHeight={{base: '95px', md: '100px'}}
              overflow='hidden'
            >
            {article?.post_categories?.map((tag, i) => {
              if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return null 
              return (
                <NextLink href={`/story/tag?slug=${tag?.slug}`} passHref>
                  <Center
                    key={`tag-${i}`}
                    height={{base: '28px', md: '30px'}}
                    px={'18px'}
                    fontSize={{base: '12px', md: '14px'}}
                    background='#123E43'
                    color='#39A5B2'
                    borderRadius='full'
                    maxWidth={{base: articleList ? '140px' : '230px', md: '292px'}}
                  >
                    <Box
                      maxWidth={{base: articleList ? '140px' : '230px', md: '292px'}}
                      whiteSpace='nowrap'
                      overflow='hidden'
                      textOverflow='ellipsis'
                    >
                      #{tag?.name}
                    </Box>
                  </Center>
                </NextLink>
              )
            })}
            </Flex>
            <Box 
              position='absolute'
              bottom='0'
              right='20px'
              zIndex='10'
              boxSize={{base: '', md: '30px'}}
              css={{
                '.path': {
                  strokeDasharray: 1000,
                  strokeDashoffset: 5,
                  animation: 'dash 1s linear infinite'
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49.5"
                height="30"
                viewBox="0 0 49.5 30"
              >
                <g data-name="Group 208" transform="translate(-346.397 -1348.503)">
                  <g
                    data-name="Group 208"
                    transform="translate(348.897 1345.503)"
                    style={{ mixBlendMode: "screen", isolation: "isolate" }}
                  >
                    <circle
                      cx="15"
                      cy="15"
                      r="15"
                      fill="#292929"
                      data-name="Ellipse 25"
                      transform="translate(17 3)"
                    ></circle>
                    <path
                      className='path'
                      fill="none"
                      stroke="#969696"
                      strokeLinecap="round"
                      strokeWidth="1"
                      d="M-2 19h35l-4.378-5"
                      data-name="Path 95"
                    ></path>
                  </g>
                </g>
              </svg>
            </Box>
          </VStack>
        </NextLink>
      )}
    </IsVisible>
  )
}