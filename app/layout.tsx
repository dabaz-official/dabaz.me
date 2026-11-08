import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SoundProvider } from "@dabaz/components/audio/sound-provider";
import Footer from "@dabaz/components/layout/footer";
import Nav from "@dabaz/components/layout/nav";
import ThemeProvider from "@dabaz/components/theme-provider";
import site from "@dabaz/data/site";

import "./globals.css";

const clashDisplay = localFont({
  src: [
    {
      path: "../styles/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const generalSans = localFont({
  src: [
    {
      path: "../styles/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "../styles/fonts/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/GeistMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DabAZ — hacker · musician · designer · developer",
    template: "%s — DabAZ",
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clashDisplay.variable} ${generalSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <SoundProvider>
            <Nav />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
