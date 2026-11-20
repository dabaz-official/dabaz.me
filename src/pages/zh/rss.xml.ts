import type { APIRoute } from "astro";
import { buildFeed } from "../../lib/feed";
import type { Locale } from "../../lib/i18n";

/** The Chinese writing feed (`/zh/rss.xml`). */
const locale: Locale = "zh";

export const GET: APIRoute = async () => buildFeed(locale);
