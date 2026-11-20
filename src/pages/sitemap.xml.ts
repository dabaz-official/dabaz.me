import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import site from "../data/site";
import {
  homePath,
  htmlLang,
  locales,
  otherLocale,
  type Locale,
} from "../lib/i18n";
import {
  collectTags,
  pageCount,
  pagePath,
  postPath,
  postsForLocale,
  publishedPosts,
  tagPathFromSlug,
  translationPostPath,
  translationTagPath,
  writingPath,
} from "../lib/writing";

/**
 * The sitemap: every public route, one `<url>` per locale, with the
 * `xhtml:link` alternates that match the head's `hreflang` set. Drafts never
 * reach `publishedPosts()`, so they never reach this file.
 *
 * A translation pair exists only when the same page exists in both locales;
 * a post or a tag without a twin advertises itself alone.
 */

interface UrlEntry {
  path: string;
  locale: Locale;
  /** The equivalent path in the other locale, when it exists. */
  translationPath?: string;
  lastmod?: string;
}

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const absolute = (path: string) => new URL(path, site.url).href;
const tag = (locale: Locale) => htmlLang(locale);

function links(entry: UrlEntry) {
  const self = { hreflang: tag(entry.locale), href: absolute(entry.path) };
  const twin = entry.translationPath
    ? {
        hreflang: tag(otherLocale(entry.locale)),
        href: absolute(entry.translationPath),
      }
    : undefined;
  const all = twin ? [self, twin].sort((a, b) => a.hreflang.localeCompare(b.hreflang)) : [self];
  const english = all.find((link) => link.hreflang === "en");
  const xDefault = english?.href ?? self.href;
  return { all, xDefault };
}

function url(entry: UrlEntry): string {
  const { all, xDefault } = links(entry);
  const alternates = all
    .map(
      (link) =>
        `    <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${escapeXml(link.href)}"/>`,
    )
    .join("\n");
  return `  <url>
    <loc>${escapeXml(absolute(entry.path))}</loc>
${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ""}${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}"/>
  </url>`;
}

export const GET: APIRoute = async () => {
  const published = publishedPosts(await getCollection("writing"));
  const entries: UrlEntry[] = [];

  // Home, both locales.
  entries.push(
    { path: homePath("en"), locale: "en", translationPath: homePath("zh") },
    { path: homePath("zh"), locale: "zh", translationPath: homePath("en") },
  );

  for (const locale of locales) {
    // Writing, page 1, and later pages when they exist.
    entries.push({
      path: writingPath(locale),
      locale,
      translationPath: writingPath(otherLocale(locale)),
    });

    const posts = postsForLocale(published, locale);
    const total = pageCount(posts.length);
    const otherTotal = pageCount(
      postsForLocale(published, otherLocale(locale)).length,
    );
    for (let page = 2; page <= total; page += 1) {
      entries.push({
        path: pagePath(page, locale),
        locale,
        translationPath:
          page <= otherTotal ? pagePath(page, otherLocale(locale)) : undefined,
      });
    }

    // Tags in use for this locale.
    for (const summary of collectTags(posts)) {
      entries.push({
        path: tagPathFromSlug(summary.slug, locale),
        locale,
        translationPath: translationTagPath(summary.slug, locale, published),
      });
    }

    // Posts, with their own publication day as `lastmod`.
    for (const post of posts) {
      entries.push({
        path: postPath(post),
        locale,
        translationPath: translationPostPath(post, published),
        lastmod: post.data.date,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(url).join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
