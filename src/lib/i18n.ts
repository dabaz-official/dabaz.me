/**
 * Locale seam — DESIGN.md §10, §11.
 *
 * One vocabulary for the site: the locale list, the default locale, the
 * BCP 47 tag each locale renders as, and the path prefix rule. Routing uses
 * Astro's built-in i18n with `prefixDefaultLocale: false`, so `en` lives at
 * `/` and `zh` at `/zh`.
 *
 * The document language is `zh-CN`, not `zh`: DabFonts TYPESETTING.md §7
 * requires it, and English runs inside a Chinese page carry `lang="en"`.
 */
export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** A value that exists in every locale. Proper nouns stay plain strings. */
export type Localized<T = string> = { [L in Locale]: T };

/** BCP 47 tag for `<html lang>`, `<time lang>`, and `hreflang`. */
export function htmlLang(locale: Locale): "en" | "zh-CN" {
  return locale === "zh" ? "zh-CN" : "en";
}

/** The other locale, for the language switch and the alternate routes. */
export function otherLocale(locale: Locale): Locale {
  return locale === defaultLocale ? "zh" : "en";
}

/**
 * Prefix a site-relative path with the locale, unless it is the default one.
 * `localePath("en", "/")` is `/`; `localePath("zh", "/")` is `/zh`.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

/** The locale's home page: `/` or `/zh`. */
export function homePath(locale: Locale): string {
  return localePath(locale, "/");
}

/** A home anchor that survives the locale prefix: `/#work` or `/zh/#work`. */
export function homeAnchorPath(locale: Locale, anchor: string): string {
  const home = homePath(locale);
  return `${home === "/" ? "" : home}/#${anchor}`;
}

/** The locale's writing feed: `/rss.xml` or `/zh/rss.xml`. */
export function rssPath(locale: Locale): string {
  return localePath(locale, "/rss.xml");
}
