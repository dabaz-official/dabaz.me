import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import {NextIntlClientProvider} from 'next-intl';

import '@dabaz/styles/globals.css';
import '@dabaz/styles/tailwind.css';
import '@dabaz/styles/fonts/inter.css'
import Navbar from '@dabaz/components/layout/nav';
import Footer from '@dabaz/components/layout/footer';

type Props = {
  children: React.ReactNode;
};

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dabaz.me'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'DabAZ',
    template: '%s | DabAZ'
  },
  description: 'My portfolio, blog, and personal website.'
};

export default async function RootLayout({children}: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased bg-bg-light-2 dark:bg-bg-dark-2`}
      >
        <NextIntlClientProvider>
          <ThemeProvider 
            defaultTheme='system'
            enableSystem={true}
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
