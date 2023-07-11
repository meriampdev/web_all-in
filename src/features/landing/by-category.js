import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Article } from './article'
import { WP_ADMIN_ID } from '@/constants'


export const ByCategory = ({ slug, ...rest }) => {
  const [list, setList] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/categories/slug:${slug}`)
      .then((response) => {
        setCategory(response?.data)
      }).catch((err) => {
        console.err('err', err)
      })

    axios
      .get(`https://public-api.wordpress.com/rest/v1.1/sites/${WP_ADMIN_ID}/posts?pretty=true&category=${slug}&number=3`)
      .then((response) => {
        setList(response?.data?.posts)
      }).catch((err) => {
        console.err('err', err)
      })
  }, [])

  return (
    <Box {...rest}>
      <Box
        height={{base: '', md: '77px'}}
        borderLeft='2px solid white'
        paddingLeft={{base: '', md: '30px'}}
        fontSize={{base: '', md: '45px'}}
        lineHeight={{base: '', md: '55px'}}
        marginBottom={{base: '', md: '50px'}}
        display='flex'
        alignItems='flex-end'
      >
        #{category?.description}
      </Box>
      <Flex 
        flexWrap='wrap'
        gridGap={{base: '', md: '70px'}}
      >
        {list.map((article) => {
          return (
            <Article article={article} />
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