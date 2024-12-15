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
    default: 'DabAZ - Entrepreneur with a Vision',
    template: '%s - DabAZ',
  },
  description: 'Hi, I’m Diebold Dai, a 6-figure entrepreneur passionate about turning visions into thriving realities.',
  keywords: [
    '6-figure business owner', 
    '7-figure entrepreneur', 
    'cross-border e-commerce', 
    'vision-driven leadership', 
    'self-made entrepreneur', 
    'perseverance', 
    'visionary thinking', 
    'adaptability', 
    'continuous growth', 
    'customer-centric', 
    'interdisciplinary innovation', 
    'white-hat hacker', 
    'creative problem-solving', 
    'front-end development', 
    'multi-faceted entrepreneur', 
    'strategic execution', 
    'market expansion', 
    'e-commerce success', 
    'startup challenges', 
    'leadership principles',
    'DabAZ',
    'Diebold Dai',
  ],
  openGraph: {
    title: 'DabAZ - Entrepreneur with a Vision',
    description: 'Hi, I’m Diebold Dai, an entrepreneur passionate about turning visions into thriving realities. As a 6-figure business owner striving to reach the 7-figure milestone, I’ve learned that perseverance and a clear vision are the cornerstones of sustainable success.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="en-US">
        <body className="antialiased tracking-tight">
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-neutral-900">
            <main className="max-w-3xl mx-auto w-full space-y-6">
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
