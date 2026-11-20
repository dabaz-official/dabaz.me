import site from "../data/site";
import type { Locale } from "./i18n";

/**
 * The metadata contract every page hands to `BaseLayout`.
 *
 * Thread 5 extends this shape with Open Graph fields, hreflang, and JSON-LD;
 * it does not replace the helper.
 */
export interface PageMeta {
  /** Page title without the site suffix. Use the site name for the home page. */
  title: string;
  description: string;
  /** Site-relative path, e.g. `/` or `/zh/writing/hello`. */
  path?: string;
  /** The page's locale; the title separator follows it. Defaults to `en`. */
  locale?: Locale;
}

export interface ResolvedMeta {
  title: string;
  description: string;
  canonical: string;
}

export function resolveMeta({
  title,
  description,
  path = "/",
  locale = "en",
}: PageMeta): ResolvedMeta {
  // A Chinese title uses the Chinese dash, with no space around it
  // (DabFonts TYPESETTING.md §3.1 R6); English keeps the em dash with spaces.
  const separator = locale === "zh" ? "——" : " — ";
  return {
    title: title === site.name ? site.name : `${title}${separator}${site.name}`,
    description,
    canonical: new URL(path, site.url).href,
  };
}
