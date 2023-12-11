import { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
import Head from 'next/head'
import NextLink from 'next/link'
import { Container } from '@/components/container'
import { Box, Button, Center, Flex, HStack, VStack, Text, RadioGroup, Stack, Radio, Input, Textarea, Checkbox } from '@chakra-ui/react'
import { Header } from '@/components/header'
import { Search } from '@/features/landing/search'
import { Footer } from '@/components/footer'
import { WP_REST_API } from '@/constants'
import { useMemo } from 'react'

export default function Contact() {
  const [isAgree, setIsAgree] = useState(false)
  const [inquiry_type, setInquiryType] = useState('inquiry')
  const [formData, setFormData] = useState({})
  const [forConfirm, setForConfirm] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_name: '',
      department_name: '',
      familyname_kanji: '',
      givenname_kanji: '',
      familyname_furigana: '',
      givenname_furigana: '',
      email: '',
      inquiry: ''
    }
  })

  const validateEmail = () => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i
  }

  const submitForm = (_formData) => {
    setForConfirm(true)
    setConfirmed(false)
    setFormData({
      ..._formData,
      inquiry_type: inquiry_type === 'inquiry' ? 'お問い合わせ' : '求人を掲載したい',
      name: `${_formData?.familyname_furigana}${_formData?.givenname_furigana}`,
      name_kanji: `${_formData?.familyname_kanji}${_formData?.givenname_kanji}`,
      name_furigana: `${_formData?.familyname_furigana}${_formData?.givenname_furigana}`
    })
  }

  const handleConfirm = () => {
    setConfirmed(true)
    sendInquiry()
  }

  const sendInquiry = async () => {
    setLoading(true)
    try {
      let response = await axios.post(`${WP_REST_API}/wp-json/api/inquiry`, formData)
      setLoading(false)
      if(response?.data?.success) {
        setDone(true)
        setFormData({})
        setInquiryType('inquiry')
        setIsAgree(false)
        setForConfirm(false)
        setConfirmed(false)
        reset()
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const FieldWrap = useMemo(() => (
    ({ children, ...rest }) => (
      <Flex 
        flexDirection={{ base: 'column', md: forConfirm ? 'row' : 'column'}}
        gridGap={{ base: '17px', md: forConfirm ? '25px' : '20px' }}
        {...rest}
      >
        {children}
      </Flex>
    ) 
  ), [])

  const RequiredTag = useMemo(() => (
    ({ isInvalid, label }) => (
      forConfirm ? null : 
      <>
        <Center
          borderRadius='full'
          fontSize='10px'
          background='transparent linear-gradient(90deg, #934B77 0%, #813131 100%) 0% 0% no-repeat padding-box;'
          minWidth={'48px'}
          height={'18px'}
        >
          必須
        </Center>
        {isInvalid && <Text fontWeight='medium' fontSize={{ base: '12px', md: '14px'}} color='red.400'>{label}を入力してください</Text>}
      </>
    )
  ), [forConfirm])

  const RenderFormField = useMemo(() => (
    ({ formKey, children }) => {
      if(forConfirm) {
        return <Text fontSize={'16px'}>{formData[formKey]}</Text>
      }
  
      return children
    }
  ), [forConfirm])

  return (
    <>
      <Box margin='0 auto' width='100%' position='relative'>
        <Box position='relative' height='100%'>
          <Flex justifyContent='space-between'>
            <Header />
            <Search 
              top={{base: '33px', md: '0'}}
              right={{base: '23px', md: '0'}}
              marginTop={{ base: '33px', md: '41px' }}
              marginRight={{base: '23px', md: '55px'}}
              marginLeft='auto'
            />
          </Flex>
        </Box>
        <Container 
          marginTop={{base: '120px', md: '140px'}}
          paddingLeft={{base: '0', md: '132px'}}
          paddingRight={{base: '0', md: '128px'}}
          _after={{
            position: 'absolute',
            top: 0,
            right: 0,
            content: "''",
            width: '7px',
            height: '100%',
            background: '#707070'
          }}
        >
          <Center
            fontSize={{base: '25px', md: '28px'}}
            lineHeight={{base: '43px', md: '44px'}}
          >
            お問い合わせ
          </Center>
          
          <Center paddingTop={{base: '30px', md: '50px'}}>
            <Text 
              fontWeight='bold'
              fontSize='xl' 
              color='red.400'
              visibility={Object.keys(errors).length > 0 ? 'visible' : 'hidden'}
            >
              フォームにエラーがあります
            </Text>
          </Center>
          
          <Center width='100%'>
            {done && (
              <Box
                width='100%'
                borderRadius='17px'
                mt={{ base: '60px', md: '70px'}}
                padding={{base: '62px 25px', md: '100px 120px'}}
                background={'#CFD4D7'}
              >
                <VStack spacing='30px'>
                  <Text 
                    color='black' 
                    fontSize={{ base: '12px', md: '14px'}} 
                    textAlign='center'
                    lineHeight={'30px'}
                  >
                    お問い合わせありがとうございます。 <br />
                    確認次第、担当者よりご連絡をさせていただきます。
                  </Text>
                  <NextLink href='/' passHref>
                    <Button
                      bg='black'
                      color='white'
                      width={{base: '184px', md: '197px'}}
                      height={{base: '51px', md: '56px'}}
                      borderRadius='full'
                      fontSize={{base: '16px', md: '20px'}}
                      _hover={{
                        bg: 'black',
                        opacity: 0.8
                      }}
                    >
                      TOPへ
                    </Button>
                  </NextLink>
                </VStack>
              </Box>
            )}
            <Box
              display={done ? 'none' : 'block'}
              width='100%'
              borderRadius='17px'
              padding={{base: '30px 25px', md: '50px 120px'}}
              background={
                forConfirm ? '#CFD4D7' :
                'transparent linear-gradient(180deg, #000 0%, #222222 100%) 0% 0% no-repeat padding-box'
              }
              color={forConfirm ? 'black' : 'white'}
              mt={forConfirm ? '70px' : '0'}
            >
              {forConfirm && (
                <Box fontSize={'14px'} lineHeight='44px' mb='57px'>
                  内容を確認の上、送信ボタンを押してください。
                </Box>
              )}
              <FieldWrap>
                <Text fontSize={{base: '12px', md: '14px'}}>
                  種別
                </Text>
                <RenderFormField formKey={'inquiry_type'}>
                  <RadioGroup
                    value={inquiry_type}
                    onChange={setInquiryType}
                  >
                    <Stack 
                      direction={{base: 'column', md: 'row'}} 
                      spacing={{ base: '14px', md: '26px'}}
                      fontSize={{ base: '14px', mg: '16px'}}
                    >
                      <Radio value='post_a_job'>
                      求人を掲載したい
                      </Radio>
                      <Radio value='inquiry'>
                      お問い合わせ
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </RenderFormField>
              </FieldWrap>
              <VStack 
                marginTop={{base: '42px', md: '50px'}} 
                alignItems='flex-start' 
                spacing={{ base: '30px', md: '52px'}}
              >
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack flexWrap='wrap' spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                      会社・組織名
                    </Text>
                    <RequiredTag 
                      label='会社・組織名'
                      isInvalid={!!errors?.company_name} 
                    />
                  </HStack>
                  <RenderFormField formKey={'company_name'}>
                    <Input 
                      {...register('company_name', { required: true })}
                      isInvalid={!!errors?.company_name}
                      placeholder='会社名・組織名'
                      _placeholder={{
                        color: 'black',
                        opacity: 0.2
                      }}
                      color='black'
                      fontSize={'16px'}
                      width='100%'
                      height={'50px'}
                      background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                    />
                  </RenderFormField>
                </FieldWrap>
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                      部署名・部門名
                    </Text>
                  </HStack>
                  <RenderFormField formKey={'department_name'}>
                    <Input 
                      {...register('department_name')}
                      placeholder='会社名・組織名'
                      _placeholder={{
                        color: 'black',
                        opacity: 0.2
                      }}
                      color='black'
                      fontSize={'16px'}
                      width='100%'
                      height={'50px'}
                      background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                    />
                  </RenderFormField>
                </FieldWrap>
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack flexWrap='wrap' spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                    氏名(漢字)
                    </Text>
                    <RequiredTag 
                      label='氏名(漢字)'
                      isInvalid={!!errors?.familyname_kanji} 
                    />
                  </HStack>
                  <Flex gridGap='24px' width='100%'>
                    <RenderFormField formKey={'familyname_kanji'}>
                      <Input 
                        {...register('familyname_kanji', { required: true })}
                        isInvalid={!!errors?.familyname_kanji}
                        placeholder='田中'
                        _placeholder={{
                          color: 'black',
                          opacity: 0.2
                        }}
                        color='black'
                        fontSize={'16px'}
                        width='100%'
                        height={'50px'}
                        background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                      />
                    </RenderFormField>
                    <RenderFormField formKey={'givenname_kanji'}>
                      <Input 
                        {...register('givenname_kanji', { required: true })}
                        isInvalid={!!errors?.givenname_kanji}
                        placeholder='太郎'
                        _placeholder={{
                          color: 'black',
                          opacity: 0.2
                        }}
                        color='black'
                        fontSize={'16px'}
                        width='100%'
                        height={'50px'}
                        background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                      />
                    </RenderFormField>
                  </Flex>
                </FieldWrap>
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack flexWrap='wrap' spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                    氏名(ふりがな)
                    </Text>
                    <RequiredTag 
                      label='氏名(ふりがな)'
                      isInvalid={!!errors?.familyname_furigana} 
                    />
                  </HStack>
                  <Flex gridGap='24px' width='100%'>
                    <RenderFormField formKey={'familyname_furigana'}>
                      <Input 
                        {...register('familyname_furigana', { required: true })}
                        isInvalid={!!errors?.familyname_furigana}
                        placeholder='たなか'
                        _placeholder={{
                          color: 'black',
                          opacity: 0.2
                        }}
                        color='black'
                        fontSize={'16px'}
                        width='100%'
                        height={'50px'}
                        background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                      />
                    </RenderFormField>
                    <RenderFormField formKey={'givenname_furigana'}>
                      <Input 
                        {...register('givenname_furigana', { required: true })}
                        isInvalid={!!errors?.givenname_furigana}
                        placeholder='たろう'
                        _placeholder={{
                          color: 'black',
                          opacity: 0.2
                        }}
                        color='black'
                        fontSize={'16px'}
                        width='100%'
                        height={'50px'}
                        background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                      />
                    </RenderFormField>
                    
                  </Flex>
                </FieldWrap>
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack flexWrap='wrap' spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                    メールアドレス
                    </Text>
                    <RequiredTag 
                      label='メールアドレス'
                      isInvalid={!!errors?.email} 
                    />
                  </HStack>
                  <RenderFormField formKey={'email'}>
                    <Input 
                      {...register('email', { 
                        validate: {
                          required: (val) => {
                            let notEmpty = val?.trim().length > 0
                            return notEmpty
                          },
                        },
                        pattern: {
                          value: validateEmail(),
                          message: '有効なメールアドレスを入力してください。',
                        },
                      })}
                      isInvalid={!!errors?.email}
                      placeholder='メールアドレス'
                      _placeholder={{
                        color: 'black',
                        opacity: 0.2
                      }}
                      color='black'
                      fontSize={'16px'}
                      width='100%'
                      height={'50px'}
                      background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                    />
                  </RenderFormField>
                </FieldWrap>
                <FieldWrap alignItems='flex-start' width='100%' spacing='14px'>
                  <HStack flexWrap='wrap' spacing='16px'>
                    <Text fontSize={{ base: '12px', md: '14px'}}>
                    問い合わせ内容
                    </Text>
                    <RequiredTag 
                      label='問い合わせ内容'
                      isInvalid={!!errors?.inquiry} 
                    />
                  </HStack>
                  <RenderFormField formKey={'inquiry'}>
                    <Textarea 
                      {...register('inquiry', { required: true })}
                      isInvalid={!!errors?.inquiry}
                      placeholder='テキストを入力してください'
                      _placeholder={{
                        color: 'black',
                        opacity: 0.2
                      }}
                      color='black'
                      fontSize={'16px'}
                      padding={'17px 26px'}
                      resize='none'
                      width='100%'
                      minHeight={{base: '100px', md: '147px'}}
                      height={'50px'}
                      background='transparent linear-gradient(270deg, #D6DCE0 0%, #B7B7B7 73%, #C5BEC6 100%) 0% 0% no-repeat padding-box'
                    />
                  </RenderFormField>
                </FieldWrap>
                {(!forConfirm && !confirmed) && 
                  <VStack alignItems='flex-start' width='100%' spacing='14px'>
                    <HStack flexWrap='wrap' spacing='16px'>
                      <Text fontSize={{ base: '12px', md: '14px'}}>
                      個人情報の取り扱いについて
                      </Text>
                      <RequiredTag />
                    </HStack>
                    <Checkbox isChecked={isAgree} onChange={(e) => setIsAgree(e.target.checked)}>
                      <Text fontSize={{ base: '12px', md: '14px'}}>
                      個人情報保護に関する事項に同意して先に進む
                      </Text>
                    </Checkbox>
                  </VStack>
                }
                <Center width='100%'>
                  {forConfirm ? (
                      <Flex 
                        flexDirection={{base: 'column-reverse', md: 'row'}}
                        gridGap={{ base: '30px', md: '60px'}}
                        alignItems='center'
                      >
                        <Button
                          onClick={() => {
                            setForConfirm(false)
                          }}
                          bg='#84363D'
                          color='white'
                          width={{base: '206px', md: '214px'}}
                          height={{base: '48px', md: '52px'}}
                          borderRadius='full'
                          fontSize={{base: '16px', md: '20px'}}
                          _hover={{
                            bg: '#84363D',
                            opacity: 0.8
                          }}
                        >
                          戻る
                        </Button>
                        <Button
                          isLoading={loading}
                          onClick={handleConfirm}
                          loadingText='送信する'
                          bg='black'
                          color='white'
                          width={{base: '238px', md: '254px'}}
                          height={{base: '48px', md: '52px'}}
                          borderRadius='full'
                          fontSize={{base: '16px', md: '20px'}}
                          _hover={{
                            bg: 'black',
                            opacity: 0.8
                          }}
                        >
                          送信する
                        </Button>
                      </Flex>
                    ) : (
                      <Button
                        isDisabled={!isAgree}
                        onClick={handleSubmit(submitForm)}
                        width={{base: '286px', md: '314px'}}
                        height={{base: '48px', md: '52px'}}
                        borderRadius='full'
                        fontSize={{base: '16px', md: '20px'}}
                      >
                        入力を確認する
                      </Button>
                    )
                  }
                </Center>
              </VStack>
            </Box>
          </Center>
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export async function getStaticProps() {

  return {
    props: {
      seo: {
        title: 'お問い合わせ｜Umplex',
        description: 'Umplexについてのお問い合わせページです。'
      }
    },
  }
}