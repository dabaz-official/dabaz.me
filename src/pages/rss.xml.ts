import type { APIRoute } from "astro";
import site from "../data/site";

/**
 * The feed. No posts are published yet, so the channel is valid but empty;
 * thread 3 fills it from the writing collection.
 */
export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}/</link>
    <description>${site.description}</description>
    <language>en</language>
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
