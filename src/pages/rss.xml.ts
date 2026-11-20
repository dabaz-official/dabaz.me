import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import site from "../data/site";
import { rssDate } from "../lib/dates";
import { postPath, publishedPosts } from "../lib/writing";

/**
 * The feed. One channel for the site; items are every published post, newest
 * first, with the summary as the description and the tags as categories.
 *
 * The channel itself stays English while the site has one feed; a post's link
 * carries its own `/zh` prefix, so a Chinese post is reachable from it.
 *
 * Dates come from the records, never from the build clock, so the same commit
 * produces the same feed.
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

export const GET: APIRoute = async () => {
  const posts = publishedPosts(await getCollection("writing"));
  const newest = posts[0]?.data.date;

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
    <title>${escapeXml(site.name)} — Writing</title>
    <link>${site.url}/writing</link>
    <description>${escapeXml(site.description.en)}</description>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${newest ? `    <lastBuildDate>${rssDate(newest)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
