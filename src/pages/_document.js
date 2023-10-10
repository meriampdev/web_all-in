import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Umplex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Umplex" />
        <meta property="og:description" content="ー感情に合わせて求人が見つかるメディアー" />
        <meta property="og:image" content="/OGP1200x630.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Umplex" />
        <meta name="twitter:description" content="ー感情に合わせて求人が見つかるメディアー" />
        <meta name="twitter:image" content="/OGP1200x630.jpg" />
        <meta name="description" content="ー感情に合わせて求人が見つかるメディアー" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
