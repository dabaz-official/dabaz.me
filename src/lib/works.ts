import type { CollectionEntry } from "astro:content";
import { localePath, type Locale } from "./i18n";

/**
 * The works order, in one place.
 *
 * A record's `order` is the curated sequence: lower first, so the home
 * showcase and the `/work` grid present projects in the order the owner wants
 * rather than strictly by year. Records without an `order` fall back to newest
 * first, and an unordered record never jumps ahead of a curated one.
 */
export function sortWorks(entries: CollectionEntry<"works">[]) {
  return [...entries].sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (b.data.year ?? 0) - (a.data.year ?? 0);
  });
}

/**
 * One project's page in a locale: `/work/dabmusic`, `/zh/work/dabmusic`.
 *
 * A work record is written once in English and carries its own translations in
 * `Localized` fields, so both locales read the same `entry.id` and the locale
 * is only the prefix.
 */
export function workDetailPath(
  locale: Locale,
  entry: { id: string },
): string {
  return localePath(locale, `/work/${entry.id}`);
}
