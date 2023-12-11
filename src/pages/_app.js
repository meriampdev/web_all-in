import Script from 'next/script'
import { SeoHead } from '@/components/seo-head'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import NextProgress from 'next-progress'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ["500", "600", "700"], })
// const noton_sans = Noto_Sans_JP({ subsets: ['latin'], weight: ["500", "600", "700"], })

export default function App({ Component, pageProps }) {
  return (
    <>
      <SeoHead 
        title={pageProps?.seo?.title || 'Umplex｜「感情」で検索する求人情報サイト'} 
        description={pageProps?.seo?.description || 'Umplexはエンジニアや営業といった職種の垣根を超え、「感情」を軸に求人情報を検索できる新機軸の求人サイトです。さまざまな感情が巻き起こるストーリー仕立ての求人広告が、先入観にとらわれない企業と求職者の出会いを提供します。'} 
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mailtoui@1.0.3/dist/mailtoui-min.js"
        data-options='{ 
          "title": "新しいメールを",
          "buttonText1": "Gmailで作成する", 
          "buttonText2": "Outlookで作成する", 
          "buttonText3": "Yahoo!メールで作成する", 
          "buttonText4": "デフォルトのメールアプリから作成する", 
          "buttonTextCopy": "コピー" 
        }'     
      />
      <ChakraProvider>
        <NextProgress
          delay={300}
          height={'3px'}
          color={'white'}
          options={{ showSpinner: false }}
        />
        <main className={`${montserrat.className}`}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  )
}
