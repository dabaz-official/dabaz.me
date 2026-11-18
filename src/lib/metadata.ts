import site from "../data/site";

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
  /** Site-relative path, e.g. `/` or `/writing/hello`. */
  path?: string;
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
}: PageMeta): ResolvedMeta {
  return {
    title: title === site.name ? site.name : `${title} — ${site.name}`,
    description,
    canonical: new URL(path, site.url).href,
  };
}
