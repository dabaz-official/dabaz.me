import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/layout/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/layout/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'DabAZ',
    template: '%s - DabAZ',
  },
  description: 'An entrepreneur and bug hunter with a passion for creating music, front-end development, and UI design.',
  keywords: 'DabAZ, 戴博, Diebold Dai, ethical hacker, musician, artist, designer, UI designer, developer, front-end developer, rapper, DJ',
  openGraph: {
    title: 'DabAZ',
    description: 'An entrepreneur and bug hunter with a passion for creating music, front-end development, and UI design.',
    url: baseUrl,
    siteName: 'DabAZ',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-0">
          <Navbar />
          <div>
            {children}
          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
