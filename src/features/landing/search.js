import axios from 'axios'
import { useEffect, useState } from 'react'
import { 
  Box, 
  Center, 
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack, 
  Text,
  useDisclosure,
  Flex
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { WP_REST_API } from '@/constants'
import { isReservedKeyword } from '@/utils'

export const Search = ({ ...rest }) => {
  const [list, setList] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    axios
      .get(`${WP_REST_API}/wp-json/wp/v2/tags`)
      .then((response) => {
        if(response?.data?.length > 0) {
          setList(response.data)
        }
      }).catch((err) => {
        console.log('err', err)
      })
  }, [])

  return (
    <>
      <Box
        onClick={onOpen}
        cursor='pointer'
        position='sticky'
        top={{base: '', md: '30px'}}
        marginTop={{base: '58px', md: '119px'}}
        marginRight={{base: '', md: '128px'}}
        marginLeft='auto'
        zIndex='1000'
        borderRadius='full'
        background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
        width={{base: '157px', md: '224px'}}
        height={{base: '44px', md: '55px'}}
        {...rest}
      >
        <Center 
          alignItems='center' 
          height='100%' 
          py='11px'
          gridGap={{base: '15px', md: '20px'}}
        > 
          <VStack alignItems='flex-start' spacing='0' color='black'> 
            <Text
              lineHeight='normal'
              fontSize={{base: '10px', md: '12px'}}
            >
              今の気分で探せる
            </Text>
            <Text
              lineHeight='normal'
              fontSize={{base: '15px', md: '18px'}}
            >
              記事を探す
            </Text>
          </VStack>
          <Box 
            height='100%'
            width='2px'
            background='white'
          />
          <Search2Icon color='#707070' />
        </Center>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent 
          maxWidth='unset'
          color='white'
          background='transparent linear-gradient(0deg, #000000 0%, #414141 100%) 0% 0% no-repeat padding-box'
          width={{base: '', md: '640px !important'}}
        >
          <DrawerCloseButton margin='15px' fontSize='30px' />
          <DrawerBody
            py={{base: '80px', md: '73px'}}
            px={{base: '30px', md: '150px'}}
          >
            <Center flexDirection='column'>
              <Center
                borderRadius='full'
                background='#717171'
                lineHeight='normal'
                fontSize={{base: '15px', md: '15px'}}
                width={{base: '143px', md: '143px'}}
                height={{base: '32px', md: '32px'}}
              >
                気分で探す
              </Center>
              <Flex 
                marginTop={{base: '58px', md: '58px'}}
                flexWrap='wrap'
                justifyContent='space-between'
                gridGap={{base: '15px', md: '17px'}}
              >
                {list?.map((tag, i) => {
                  if(isReservedKeyword(tag?.slug)) return null 
                  return (
                    <Center
                      key={`tag-${i}`}
                      borderRadius='full'
                      border='1px solid white'
                      lineHeight='normal'
                      px={4}
                      fontSize={{base: '18px', md: '18px'}}
                      minWidth={{base: '129px', md: '129px'}}
                      height={{base: '38px', md: '38px'}}
                    >
                      #{tag?.name}
                    </Center>
                  )
                })}
              </Flex>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}