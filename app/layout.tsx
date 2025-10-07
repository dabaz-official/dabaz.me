import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import '@dabaz/styles/globals.css';
import '@dabaz/styles/tailwind.css';
import Navbar from '@dabaz/components/layout/nav';
import Footer from '@dabaz/components/layout/footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased bg-bg-light-2 dark:bg-bg-dark-2`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
