import './global.css'
import './fonts.css'
import type { Metadata } from 'next'
import { Navbar } from './components/layout/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/layout/footer'
import { baseUrl } from './sitemap'
import { ViewTransitions } from 'next-view-transitions'

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
    locale: 'zh_CNS',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-neutral-900">
            <main className="max-w-[44ch] mx-auto w-full space-y-6">
              {children}
            </main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
