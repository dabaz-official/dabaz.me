import type { ReactNode } from "react";

import { SoundProvider } from "@dabaz/components/audio/sound-provider";
import BootSequence from "@dabaz/components/boot-sequence";
import CommandPalette from "@dabaz/components/command-palette";
import ConsoleEasterEgg from "@dabaz/components/console-easter-egg";
import Footer from "@dabaz/components/layout/footer";
import Nav from "@dabaz/components/layout/nav";
import TerminalBar from "@dabaz/components/terminal-bar";
import ThemeProvider from "@dabaz/components/theme-provider";
import copyByLocale from "@dabaz/data/copy";
import site, { type Locale } from "@dabaz/data/site";

type RootDocumentProps = {
  locale: Locale;
  children: ReactNode;
};

/**
 * Shared document shell. The root layout owns `<html lang>` and the font
 * preload; everything inside the document lives here.
 */
export default function RootDocument({
  locale,
  children,
}: RootDocumentProps) {
  const copy = copyByLocale[locale];
  const loc = site.locales[locale];

  return (
    <html lang={loc.lang} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col bg-bg pb-14 pt-[65px] font-sans text-fg antialiased">
        {/* DabFonts: preload the body weight only; 600 follows with swap. */}
        <link
          rel="preload"
          href="/fonts/DabSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <ThemeProvider>
          <SoundProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-ink"
            >
              {copy.skip}
            </a>
            <ConsoleEasterEgg locale={locale} />
            <BootSequence locale={locale} />
            <CommandPalette locale={locale} />
            <Nav locale={locale} />
            <main id="main" className="flex flex-1 flex-col">
              {children}
            </main>
            <Footer locale={locale} />
            <TerminalBar locale={locale} />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
