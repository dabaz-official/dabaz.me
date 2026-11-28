import type { Locale } from "./i18n";
import site from "../data/site";
import social from "../data/social";
import { homePath, htmlLang } from "./i18n";
import { postPath, type WritingEntry } from "./writing";

/**
 * JSON-LD for the routes that carry structured data (rule 07 §3).
 *
 * `Person` and `WebSite` describe the home page in either locale; a post
 * carries `BlogPosting`; the list and tag routes carry `CollectionPage`.
 * Values come from the records and `site.ts`, never from the build clock.
 */

const person = (locale: Locale) => ({
  "@type": "Person",
  name: site.name,
  url: new URL(homePath(locale), site.url).href,
  jobTitle: site.role[locale],
  description: site.description[locale],
  email: `mailto:${site.email}`,
  sameAs: social.all
    .map((link) => link.href)
    .filter((href) => href.startsWith("https://")),
});

const website = (locale: Locale) => ({
  "@type": "WebSite",
  name: site.name,
  url: new URL(homePath(locale), site.url).href,
  description: site.description[locale],
  inLanguage: htmlLang(locale),
});

export function homeJsonLd(locale: Locale) {
  return [{ "@context": "https://schema.org", ...person(locale) }, website(locale)];
}

export function collectionJsonLd({
  locale,
  path,
  name,
  description,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: new URL(path, site.url).href,
    inLanguage: htmlLang(locale),
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: new URL(homePath(locale), site.url).href,
    },
  };
}

export function postJsonLd(entry: WritingEntry) {
  const { locale, title, summary, date, tags } = entry.data;
  const url = new URL(postPath(entry), site.url).href;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    datePublished: date,
    inLanguage: htmlLang(locale),
    url,
    mainEntityOfPage: url,
    image: new URL(site.ogImage[locale], site.url).href,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  };
}
