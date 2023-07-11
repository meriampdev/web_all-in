import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ["500", "600", "700"], })
// const noton_sans = Noto_Sans_JP({ subsets: ['latin'], weight: ["500", "600", "700"], })

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={`${montserrat.className}`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}
