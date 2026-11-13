import type { Metadata, Viewport } from "next";

import site, { type Locale } from "@dabaz/data/site";

const languages = Object.fromEntries(
  Object.values(site.locales).map((loc) => [loc.hreflang, loc.path]),
);

export function buildMetadata(locale: Locale): Metadata {
  const loc = site.locales[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${loc.pageTitle} — ${site.name}`,
      template: `%s — ${site.name}`,
    },
    description: loc.description,
    applicationName: site.name,
    appleWebApp: {
      capable: true,
      title: site.name,
      statusBarStyle: "default",
    },
    alternates: {
      canonical: loc.path,
      languages: {
        ...languages,
        "x-default": site.locales.en.path,
      },
    },
    openGraph: {
      type: "website",
      url: loc.path,
      siteName: site.name,
      title: loc.pageTitle,
      description: loc.description,
      locale: loc.ogLocale,
      images: [
        {
          url: `/og/${locale}`,
          width: 1200,
          height: 630,
          alt: loc.pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: loc.pageTitle,
      description: loc.description,
      images: [
        {
          url: `/og/${locale}`,
          width: 1200,
          height: 630,
          alt: loc.pageTitle,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.theme.light },
    { media: "(prefers-color-scheme: dark)", color: site.theme.dark },
  ],
  colorScheme: "light dark",
};
