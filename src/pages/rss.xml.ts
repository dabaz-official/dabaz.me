import type { APIRoute } from "astro";
import { buildFeed } from "../lib/feed";
import { defaultLocale } from "../lib/i18n";

/** The English writing feed; `/zh/rss.xml` is the Chinese one. */
export const GET: APIRoute = async () => buildFeed(defaultLocale);
