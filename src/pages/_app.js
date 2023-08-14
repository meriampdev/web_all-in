import { AppContainer } from '@/components/app-container'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import NextProgress from 'next-progress'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ["500", "600", "700"], })
// const noton_sans = Noto_Sans_JP({ subsets: ['latin'], weight: ["500", "600", "700"], })

export default function App({ Component, pageProps }) {
  return (
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
  )
}
