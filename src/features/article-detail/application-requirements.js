import { useCallback, useState } from 'react'
import { useIsOverflow } from '@/hooks/useIsOverflow'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'

export const ApplicationRequirements = ({ floatingBtn, article, content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bodyNode, setNode] = useState({ current: null })
  const bodyRef = useCallback((node) => {
    if (node !== null) {
      setNode({ current: node })
    }
  }, [])
  const { isOverflowY } = useIsOverflow(bodyNode, 'vertical')

  const backToTop = () => {
    if(bodyNode?.current) {
      bodyNode?.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {floatingBtn ? (
        <Center
          cursor='pointer'
          onClick={onOpen}
          tabIndex={-1} 
          position='sticky'
          alignSelf='flex-start'
          marginTop={{base: '20px', md: '40px'}}
          marginLeft={{base: '-100px', md: '-140px'}}
          top='470px'
          right='40px'
          flexDirection='column'
          borderRadius='full'
          background='black'
          fontSize={{ base: '14px', md: '20px'}}
          lineHeight={{ base: '20px', md: '25px'}}
          minWidth={{base: '100px', md: '150px'}}
          height={{base: '100px', md: '150px'}}
        >
          <Box>募集要項</Box>
          <Box>を見る</Box>
        </Center>
        ) : (
          <Button
            cursor='pointer'
            onClick={onOpen}
            tabIndex={-1} 
            bg='white'
            color='black'
            fontWeight='normal'
            width={{base: '100%', md: '314px'}}
            height={{base: '48px', md: '52px'}}
            fontSize={{base: '16px', md: '22px'}}
            borderRadius='full'
            _hover={{ opacity: 0.8 }}
          >
            募集要項を詳しく見る
          </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='6xl' scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            ref={bodyRef}
            padding={{base: '', md: '81px 115px'}}
          >
            <Text
              letterSpacing='2.32px'
              fontSize={{base: '25px', md: '29px'}}
            >
            募集要項
            </Text>
            <Box 
              marginTop='50px'
              fontSize={{base: '', md: '14px'}}
              lineHeight={{base: '', md: '24px'}}
              letterSpacing='1.12px'
              css={{
                '*': {
                  all: 'revert !important',
                }
              }}
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />
          </ModalBody>

          {isOverflowY && 
            <IconButton 
              onClick={backToTop}
              icon={<ChevronRightIcon fontSize='30px' transform='rotate(-90deg)' />} 
              borderRadius='full'
              bg='black'
              color='white'
              boxSize='50px'
              minHeight='50px'
              position='absolute'
              bottom='100px'
              right='30px'
              _hover={{ bg: 'black', opacity: 0.8 }}
            />
          }
          <ModalFooter bg='black'>
            <Center width='100%'>
              <Flex gridGap={{base: '12px', md: '36px'}}>
                <Link 
                  href={article?.post_acfs?.recruitment_url_link?.url} 
                  isExternal
                  width={{base: '100%', md: 'fit-content'}}
                >
                  <Button
                    width={{base: '152px', md: '258px'}}
                    height={{base: '36px', md: '46px'}}
                    borderRadius='full'
                  >
                  採用ページへ
                  </Button>
                </Link>
                <Link 
                  href={`mailto:${article?.post_acfs?.recruitment_email}`} 
                  width={{base: '100%', md: 'fit-content'}}
                >
                  <Button
                    width={{base: '152px', md: '258px'}}
                    height={{base: '36px', md: '46px'}}
                    borderRadius='full'
                  >
                    メールで応募する
                  </Button>
                </Link>
              </Flex>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}