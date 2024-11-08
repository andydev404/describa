import { ClerkProvider } from '@clerk/nextjs'
import { LogSnagProvider } from '@logsnag/next'
import { Analytics } from '@vercel/analytics/react'
import NextTopLoader from 'nextjs-toploader'

import { Providers } from './providers'

import type { Metadata } from 'next'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Describa | Transform Product Descriptions with AI-Powered Precision',
  description:
    'Boost your e-commerce sales with Describa\'s AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow'
  },
  alternates: {
    canonical: 'https://describa.ai'
  },
  applicationName: 'Describa',
  appleWebApp: {
    title: 'Describa',
    statusBarStyle: 'default',
    capable: true
  },
  openGraph: {
    url: 'https://.describa.ai',
    type: 'website',
    locale: 'en_US',
    title:
      'Transform Product Descriptions with AI-Powered Precision | Describa',
    description:
      'Boost your e-commerce sales with Describa\'s AI-generated product descriptions. Save time, improve SEO, and drive more conversions. Try it now!',
    images: [
      {
        url: 'https://utfs.io/f/gzOTTZHX3WMAMUjNjNzQVO18afWMlYdDK7b5FuPkHhwRIpAX',
        width: 1200,
        height: 630,
        alt: 'describa'
      }
    ]
  }
}

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider signUpForceRedirectUrl={'/dashboard'}>
      <html lang="en">
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <LogSnagProvider
        token="9746655c8fcb806cddf3bfbbd0f70a93"
        project="describa"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Describa" />
      <link rel="manifest" href="/site.webmanifest" />

      <body className={`min-h-screen font-sans text-foreground antialiased`}>
      <NextTopLoader color={'#000000'} />
      <Providers>{children}</Providers>
      <Analytics />
      </body>
      </html>
    </ClerkProvider>
  )
}
