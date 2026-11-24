import type { Locale } from "./i18n";

/**
 * Date formatting — one place, so a list, a post, a release, and the feed
 * never disagree.
 *
 * Two English surfaces: a short caption ("Nov 3, 2025") for a release row, and
 * a long one ("November 24, 2026") for writing, where the date sits alone
 * under a headline. Chinese uses the language's counters and one U+0020 around
 * the numeral, because DabFonts requires a space between Han and Latin or
 * digits (TYPESETTING.md §4).
 */
const englishDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const englishLongDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const chineseDate = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
});

/** "2026-03-05" → "Mar 5, 2026" or "2026 年 3 月 5 日". */
export function formatDate(isoDay: string, locale: Locale): string {
  const date = new Date(`${isoDay}T00:00:00Z`);
  if (locale === "en") return englishDate.format(date);

  const parts = Object.fromEntries(
    chineseDate.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return `${parts.year} 年 ${parts.month} 月 ${parts.day} 日`;
}

/** "2026-11-24" → "November 24, 2026"; Chinese keeps its counters. */
export function formatLongDate(isoDay: string, locale: Locale): string {
  const date = new Date(`${isoDay}T00:00:00Z`);
  if (locale === "en") return englishLongDate.format(date);
  return formatDate(isoDay, locale);
}

/** The `<time datetime>` value for an ISO day. */
export function dateTime(isoDay: string): string {
  return `${isoDay}T00:00:00Z`;
}

/** RFC 822 for the feed. */
export function rssDate(isoDay: string): string {
  return new Date(`${isoDay}T00:00:00Z`).toUTCString();
}
