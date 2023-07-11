import { Box, Center, Flex, Image, Link, VStack } from '@chakra-ui/react'

export const Article = ({ article }) => {
  return (
    <Link 
      href={article?.URL} isExternal 
      _hover={{textDecoration: 'none'}} 
      paddingBottom='30px'
    >
      <VStack
        width={{base: '', md: '292px'}}
        alignItems='flex-start'
        spacing='20px'
        position='relative'
      >
        <Box
          width='100%'
          height={{base: '', md: '209px'}}
          borderRadius='10px'
        >
          <Image 
            src={article?.post_thumbnail?.URL} 
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
          />
        </Box>
        <Box
          fontSize={{base: '', md: '16px'}}
          lineHeight={{base: '', md: '24px'}}
          letterSpacing={{base: '', md: '1.28px'}}
          dangerouslySetInnerHTML={{
            __html: article?.excerpt
          }}
          css={{
            'display': '-webkit-box',
            '-webkit-line-clamp': '3',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden'
          }}
        />
        <Flex flexWrap='wrap' gridGap='5px'>
        {Object.keys(article?.tags).map((tag) => {
          if(!article?.tags[tag]?.description) return null
          return (
            <Center
              height={{base: '', md: '30px'}}
              px={{base: '', md: '18px'}}
              fontSize={{base: '', md: '14px'}}
              background='#123E43'
              color='#39A5B2'
              borderRadius='full'
            >
              #{article?.tags[tag]?.description}
            </Center>
          )
        })}
        </Flex>
        <Box 
          position='absolute'
          bottom='-30px'
          right='0'
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