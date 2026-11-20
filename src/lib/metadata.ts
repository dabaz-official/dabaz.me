import site from "../data/site";
import { defaultLocale, otherLocale, type Locale } from "./i18n";

/**
 * The metadata contract every page hands to `BaseLayout`.
 *
 * Pages own `title`, `description`, `path`, and `locale`. Thread 5 added the
 * Open Graph type, the translated twin's path when one exists, and optional
 * JSON-LD; the props shape was extended, not replaced.
 */
export interface PageMeta {
  /** Page title without the site suffix. Use the site name for the home page. */
  title: string;
  description: string;
  /** Site-relative path, e.g. `/` or `/zh/writing/hello`. */
  path?: string;
  /** The page's locale; the title separator follows it. Defaults to `en`. */
  locale?: Locale;
  /** `website` everywhere except a post, which is `article`. */
  ogType?: "website" | "article";
  /**
   * The equivalent page in the other locale, for `hreflang` only. Omit when
   * no translation exists; the footer's language switch still has a target.
   */
  translationPath?: string;
  /** Structured data serialised into the document. */
  jsonLd?: JsonLd;
}

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export interface HreflangLink {
  /** BCP 47: `en` or `zh-CN`. */
  hreflang: string;
  /** Absolute URL. */
  href: string;
}

export interface ResolvedMeta {
  /** The complete `<title>`. */
  title: string;
  /** The page title alone: `<h1>`, `og:title`, and `twitter:title`. */
  pageTitle: string;
  description: string;
  canonical: string;
  locale: Locale;
  tagline: string;
  ogType: "website" | "article";
  ogLocale: string;
  ogImage: string;
  /** Every equivalent URL, including the current one. */
  hreflang: HreflangLink[];
  /** The fallback target for `hreflang="x-default"`. */
  xDefault: string;
}

const homePaths = new Set(["/", "/zh"]);

/** `en` and `zh` are the only title separators DabFonts allows here. */
function separator(locale: Locale): string {
  return locale === "zh" ? "——" : " — ";
}

export function resolveMeta({
  title,
  description,
  path = "/",
  locale = defaultLocale,
  ogType,
  translationPath,
}: PageMeta): ResolvedMeta {
  const isHome = homePaths.has(path);
  const tagline = site.tagline[locale];
  const dash = separator(locale);
  const pageTitle = isHome ? site.name : title;

  // Rule 10 §2: the site name leads on the home route and closes every other
  // title. The home route carries the tagline so the only title in the head
  // that repeats the name is the wordmark itself.
  const fullTitle = isHome
    ? `${site.name}${dash}${tagline}`
    : title === site.name
      ? site.name
      : `${title}${dash}${site.name}`;

  const canonical = new URL(path, site.url).href;
  const hreflang: HreflangLink[] = [
    { hreflang: locale === "zh" ? "zh-CN" : "en", href: canonical },
  ];
  if (translationPath) {
    const target = otherLocale(locale);
    hreflang.push({
      hreflang: target === "zh" ? "zh-CN" : "en",
      href: new URL(translationPath, site.url).href,
    });
  }
  hreflang.sort((a, b) => a.hreflang.localeCompare(b.hreflang));

  const self = hreflang.find(
    (link) => link.hreflang === (locale === "zh" ? "zh-CN" : "en"),
  );
  const english = hreflang.find((link) => link.hreflang === "en");
  const xDefault = english?.href ?? self?.href ?? canonical;

  return {
    title: fullTitle,
    pageTitle,
    description,
    canonical,
    locale,
    tagline,
    ogType: ogType ?? ogTypeOf(path),
    ogLocale: site.ogLocale[locale],
    ogImage: new URL(site.ogImage[locale], site.url).href,
    hreflang,
    xDefault,
  };
}

function ogTypeOf(path: string): "website" | "article" {
  return /\/writing\/[^/]+$/.test(path) ? "article" : "website";
}
