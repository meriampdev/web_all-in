import { useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
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
  Flex,
  HStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, Search2Icon } from '@chakra-ui/icons'
import { isReservedKeyword } from '@/utils'

export const Search = ({ ...rest }) => {
  const [category, setCategory] = useState()
  const [parents, setParents] = useState([])
  const [nav, setNav] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: parentCategories } = useAxios(`/wp-json/api/v1/get-parent-categories`)

  useEffect(() => {
    if(parentCategories?.length > 0) {
      setParents(parentCategories.filter((f) => f.slug !== 'uncategorized'))
      setCategory('emotion')
    }
  }, [parentCategories])

  useEffect(() => {
    if(parents?.length > 0) {
      let _categories = [...parents]
      let current = _categories.filter((f) => f?.slug === category)[0]
      let filtered = _categories.filter((f) => f?.slug !== category)
      let next = filtered.shift()
      let prev = filtered.shift()
      setNav({
        current,
        next: next,
        prev: prev,
      })
      setParents([ next, prev, current ])
    }
  }, [category])

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
          <VStack alignItems='center' spacing='0' color='black'> 
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
            px={{ base: '15px', md: '30px'}}
          >
            <Center flexDirection='column' width='100%'>
              <HStack width='100%' justifyContent='space-between' spacing='15px'>
                <HStack
                  onClick={() => setCategory(nav?.prev?.slug)}
                  cursor='pointer'
                  visibility={nav?.prev?.slug ? 'visible' : 'hidden'}
                  _hover={{ opacity: 0.8}}
                  spacing='0'
                >
                  <ChevronLeftIcon cursor='pointer' fontSize='30px' />
                  <Text whiteSpace='nowrap' fontSize={{ base: '13px', md: '15px'}}>{nav?.prev?.name}で探す</Text>
                </HStack>
                <Center
                  borderRadius='full'
                  background='#717171'
                  lineHeight='normal'
                  fontSize={{base: '15px', md: '15px'}}
                  width={'143px'}
                  height={{base: '32px', md: '32px'}}
                >
                  {nav?.current?.name}で探す
                </Center>
                <HStack
                  onClick={() => setCategory(nav?.next?.slug)}
                  cursor='pointer'
                  spacing='0'
                  visibility={nav?.next?.slug ? 'visible' : 'hidden'}
                >
                  <Text whiteSpace='nowrap' fontSize={{ base: '13px', md: '15px'}}>{nav?.next?.name}で探す</Text>
                  <ChevronRightIcon fontSize='30px' />
                </HStack>
              </HStack>
              <Flex 
                flexWrap='wrap'
                justifyContent={{ base: 'center', md: 'space-between'}}
                gridGap={{base: '15px', md: '20px'}}
                marginTop={{base: '58px', md: '58px'}}
                px={{ base: '10%', md: '0%' }}
              >
                {nav?.current?.subs?.map((tag, i) => {
                  if(isReservedKeyword(tag?.slug) || tag?.parent === 0) return null 
                  return (
                    <Flex 
                      flexBasis={{ md: '47%' }}
                      justifyContent='flex-end'
                      css={{
                        '&:nth-child(even)': {
                          justifyContent: 'flex-start'
                        }
                      }}
                    >
                      <NextLink href={`/story/tag?slug=${tag?.slug}`} passHref>
                        <Center
                          key={`tag-${i}`}
                          cursor='pointer'
                          borderRadius='full'
                          border='1px solid white'
                          lineHeight='normal'
                          py={1}
                          px={3}
                          fontSize={{base: '15px', md: '18px'}}
                          minWidth={{base: '130px', md: '170px'}}
                          minHeight={'38px'}
                          height='auto'
                          whiteSpace='nowrap'
                        >
                          #{tag?.name}
                        </Center>
                      </NextLink>
                    </Flex>
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