import { getCollection } from "astro:content";
import ui from "../content/ui";
import site from "../data/site";
import { rssDate } from "./dates";
import { htmlLang, rssPath, type Locale } from "./i18n";
import {
  postPath,
  postsForLocale,
  publishedPosts,
  writingPath,
} from "./writing";

/**
 * The writing feed, one channel per locale.
 *
 * `en` and `zh` do not share a feed: each channel carries only its own posts,
 * its own `<language>`, and its own title and description. Links and dates come
 * from the records, never from the build clock, so the same commit produces the
 * same feed.
 */
const escapeXml = (value: string): string =>
  value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );

export async function buildFeed(locale: Locale): Promise<Response> {
  const posts = postsForLocale(
    publishedPosts(await getCollection("writing")),
    locale,
  );
  const newest = posts[0]?.data.date;
  const separator = locale === "zh" ? "——" : " — ";
  const title = `${site.name}${separator}${ui.writing.title[locale]}`;

  const items = posts
    .map((entry) => {
      const { title, date, summary, tags } = entry.data;
      const link = `${site.url}${postPath(entry)}`;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rssDate(date)}</pubDate>
      <description>${escapeXml(summary)}</description>
${tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(`${site.url}${writingPath(locale)}`)}</link>
    <description>${escapeXml(site.description[locale])}</description>
    <language>${htmlLang(locale)}</language>
    <atom:link href="${escapeXml(`${site.url}${rssPath(locale)}`)}" rel="self" type="application/rss+xml"/>
${newest ? `    <lastBuildDate>${rssDate(newest)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
