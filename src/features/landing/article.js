import { isReservedKeyword } from '@/utils'
import { Box, Center, Flex, Image, Link, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

export const Article = ({ article, isLoading }) => {

  return (
    <Link 
      href={`/story/${article?.post_name || article?.slug}`} 
      _hover={{textDecoration: 'none'}} 
      paddingBottom='30px'
    >
      <VStack
        width={{base: '230px', md: '292px'}}
        alignItems='flex-start'
        spacing='20px'
        position='relative'
      >
        <Skeleton
          width='100%'
          height={{base: '152px', md: '209px'}}
          isLoaded={isLoading === false}
        >
          <Box
            width='100%'
            height={{base: '152px', md: '209px'}}
            borderRadius='10px'
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
            dangerouslySetInnerHTML={{
              __html: article?.excerpt?.rendered || article?.post_excerpt
            }}
            css={{
              'display': '-webkit-box',
              'WebkitLineClamp': '3',
              'WebkitBoxOrient': 'vertical',
              overflow: 'hidden'
            }}
          />
        </SkeletonText>
        <Flex flexWrap='wrap' gridGap='5px'>
        {article?.article_tags?.map((tag, i) => {
          if(isReservedKeyword(tag?.slug)) return null 
          return (
            <Center
              key={`tag-${i}`}
              height={{base: '28px', md: '30px'}}
              px={'18px'}
              fontSize={{base: '12px', md: '14px'}}
              background='#123E43'
              color='#39A5B2'
              borderRadius='full'
            >
              #{tag?.name}
            </Center>
          )
        })}
        </Flex>
        <Box 
          position='absolute'
          bottom='-30px'
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
    </Link>
  )
}