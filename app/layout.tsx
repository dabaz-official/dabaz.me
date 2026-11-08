import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SoundProvider } from "@dabaz/components/audio/sound-provider";
import BootSequence from "@dabaz/components/boot-sequence";
import CommandPalette from "@dabaz/components/command-palette";
import ConsoleEasterEgg from "@dabaz/components/console-easter-egg";
import Footer from "@dabaz/components/layout/footer";
import Nav from "@dabaz/components/layout/nav";
import TerminalBar from "@dabaz/components/terminal-bar";
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
  twitter: {
    card: "summary_large_image",
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
      <body className="flex min-h-svh flex-col bg-bg pb-14 font-sans text-fg antialiased">
        <ThemeProvider>
          <SoundProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-ink"
            >
              skip to content
            </a>
            <ConsoleEasterEgg />
            <BootSequence />
            <CommandPalette />
            <Nav />
            <main id="main" className="flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
            <TerminalBar />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
