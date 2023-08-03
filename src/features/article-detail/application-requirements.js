import { useCallback, useState } from 'react'
import { useIsOverflow } from '@/hooks/useIsOverflow'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'

export const ApplicationRequirements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bodyNode, setNode] = useState({ current: null })
  const bodyRef = useCallback((node) => {
    if (node !== null) {
      setNode({ current: node })
    }
  }, [])
  const { isOverflowY } = useIsOverflow(bodyNode, 'vertical')

  return (
    <>
      <Button
        onClick={onOpen}
        tabIndex={-1} 
        width={{base: '152px', md: '258px'}}
        height={{base: '36px', md: '46px'}}
        borderRadius='full'
      >
      メールで応募する
      </Button>
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
              fontSize={{base: '', md: '29px'}}
            >
            募集要項
            </Text>
            <Box marginTop='50px'>
              <Text
                fontSize={{base: '', md: '22px'}}
                lineHeight={{base: '', md: '44px'}}
              >
              仕事内容
              </Text>
              <Box
                fontSize={{base: '', md: '14px'}}
                lineHeight={{base: '', md: '24px'}}
                letterSpacing='1.12px'
              >
              9割以上が未経験スタート★誰もが知る有名商品PR！店頭での販売企画や市場調査などをお任せします！知名度の高い商材を扱うためPRしやすい◎
              </Box>
            </Box>
            <Box>
              <Text
                fontSize={{base: '', md: '18px'}}
                lineHeight={{base: '', md: '44px'}}
                letterSpacing='1.44px'
              >
              具体的には
              </Text>
              <Box>
              　 <ul>
                  <li>
                    取扱い商品のPR・広報 　
                  </li>
                  <li>
                    店頭でお客様のご案内やフォロー 　
                  </li>
                  <li>
                    POPや陳列方法等の販促企画 
                    イベントの企画・立案・実施　など 
                  </li>
                </ul>
                
                <Text>◎仕事もプライベートも充実！</Text>
                <ul>
                  <li>働きやすさと雰囲気の良さが当社の自慢！</li>
                  <li>残業も月9h未満と少なく、</li>
                  <li>産休育休取得実績も多数あります！</li>
                </ul>
              </Box>
            </Box>
          </ModalBody>

          {isOverflowY && <ModalFooter>
            <IconButton 
              icon={<ChevronRightIcon fontSize='30px' transform='rotate(-90deg)' />} 
              borderRadius='full'
              bg='black'
              color='white'
            />
          </ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  )
}