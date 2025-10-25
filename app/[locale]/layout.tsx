import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@dabaz/i18n/routing';

import '@dabaz/styles/globals.css';
import '@dabaz/styles/tailwind.css';
import '@dabaz/styles/fonts/inter.css'
import Navbar from '@dabaz/components/layout/nav';
import Footer from '@dabaz/components/layout/footer';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations('Layout');
  
  const baseUrl = 'https://dabaz.me';
  const canonicalPath = locale === 'en-US' ? '/' : `/${locale}`;
  
  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-US': '/',
        'zh-CN': '/zh-CN'
      }
    },
    title: {
      default: t('Title'),
      template: `%s | ${t('Title')}`
    },
    description: t('Description')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
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