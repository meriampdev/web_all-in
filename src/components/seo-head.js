import Head from 'next/head'

export const SeoHead = ({ title, description }) => {
  const isProd = process.env.NEXT_PUBLIC_IS_PROD === 'true'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/OGP1200x630.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/OGP1200x630.jpg" />
        <meta name="description" content={description} />

        {!isProd && <meta name="robots" content="noindex" />}
        {!isProd && <meta name="googlebot" content="noindex" />}

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Sans+JP&family=Open+Sans:wght@400;500;700&display=swap" rel="stylesheet" />     
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F5F7P61TB0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-F5F7P61TB0');
            `
          }}
        />
      </Head>
    </>
  )
}
