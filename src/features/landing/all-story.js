import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from './article'
import { WP_ADMIN_ID } from '@/constants'

export const AllStories = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&tag=article&number=6`)
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.err('err', err)
      })
  }, [])

  return (
    <Box>
      <Box
        height={{base: '', md: '77px'}}
        borderLeft='2px solid white'
        paddingLeft={{base: '', md: '30px'}}
        fontSize={{base: '', md: '50px'}}
        lineHeight={{base: '', md: '61px'}}
        marginBottom={{base: '', md: '50px'}}
        display='flex'
        alignItems='flex-end'
      >
        ALL STORY 
      </Box>
      <Flex 
        flexWrap='wrap'
        gridGap={{base: '', md: '68px'}}
      >
        {list.map((article) => {
          return (
            <Article key={`story-${article?.ID}`} article={article} />
          )
        })}
      </Flex>
      <Flex justifyContent='flex-end' marginTop={{base: '', md: '50px'}}>
        <Button 
          height={{base: '', md: '43px'}}
          width={{base: '', md: '138px'}}
          borderRadius='full'
          bg='white'
        >
          <HStack width='100%' justifyContent='center'>
            <Text>MORE</Text>
            <ChevronRightIcon fontSize='20px' />
          </HStack>
        </Button>
      </Flex>
    </Box>
  )
}