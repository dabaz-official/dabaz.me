/**
 * Writing helpers — one place that turns the `writing` collection into the
 * URLs and strings the pages and the feed share.
 *
 * This module owns the route shape for posts, tags, and pagination. Locale
 * routing is thread 4's: today every published post renders under `/writing`,
 * and `postPath()` is the only line that has to learn `/zh` later.
 */
import type { CollectionEntry } from "astro:content";
import type { Locale } from "./i18n";

export type WritingEntry = CollectionEntry<"writing">;

/** Page size for `/writing`. One screenful of rows, not a wall. */
export const POSTS_PER_PAGE = 10;

/** The file's locale must match its directory; a mismatch is an authoring bug. */
function assertCollection(entries: WritingEntry[]): void {
  const seen = new Map<string, WritingEntry>();

  for (const entry of entries) {
    const [directory] = entry.id.split("/");
    if (directory !== entry.data.locale) {
      throw new Error(
        `writing: "${entry.id}" sits in "${directory}/" but declares locale "${entry.data.locale}".`,
      );
    }

    const slug = postSlug(entry);
    const existing = seen.get(slug);
    if (existing) {
      throw new Error(
        `writing: "${entry.id}" and "${existing.id}" share the slug "${slug}". ` +
          "Locale routing (thread 4) has to exist before two locales can reuse a slug.",
      );
    }
    seen.set(slug, entry);
  }
}

/** Newest first; equal days fall back to the title so builds stay stable. */
function byNewest(a: WritingEntry, b: WritingEntry): number {
  if (a.data.date !== b.data.date) return a.data.date < b.data.date ? 1 : -1;
  return a.data.title.localeCompare(b.data.title);
}

/**
 * The posts a build may show, newest first. Drafts are excluded from
 * production builds only, so `pnpm dev` can preview them.
 */
export function publishedPosts(entries: WritingEntry[]): WritingEntry[] {
  assertCollection(entries);
  const visible = import.meta.env.PROD
    ? entries.filter((entry) => !entry.data.draft)
    : entries;
  return [...visible].sort(byNewest);
}

/** URL segment: the file name, shared across locales by the model. */
export function postSlug(entry: WritingEntry): string {
  return entry.id.split("/").pop() ?? entry.id;
}

/** Post URL. Thread 4 prefixes this with `/zh` for Chinese posts. */
export function postPath(entry: WritingEntry): string {
  return `/writing/${postSlug(entry)}`;
}

/** BCP 47 tag for the article element; the shell stays `en` until thread 4. */
export function localeTag(locale: Locale): string {
  return locale === "zh" ? "zh-Hans" : "en";
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-03-05" → "5 Mar 2026". One display format for every post. */
export function formatDate(isoDay: string): string {
  return dateFormatter.format(new Date(`${isoDay}T00:00:00Z`));
}

/** The `<time datetime>` value for an ISO day. */
export function dateTime(isoDay: string): string {
  return `${isoDay}T00:00:00Z`;
}

/** RFC 822 for the feed. */
export function rssDate(isoDay: string): string {
  return new Date(`${isoDay}T00:00:00Z`).toUTCString();
}

/** A tag's URL segment: lowercase, spaces to hyphens, CJK preserved. */
export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function tagPath(tag: string): string {
  return `/writing/tag/${encodeURIComponent(tagSlug(tag))}`;
}

export interface TagSummary {
  /** Display form, taken from the first post that uses it. */
  label: string;
  slug: string;
  posts: WritingEntry[];
}

/**
 * Every tag currently in use, alphabetically. Tags are content strings, not
 * translations: the display form is whatever the author wrote.
 */
export function collectTags(entries: WritingEntry[]): TagSummary[] {
  const bySlug = new Map<string, TagSummary>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      const slug = tagSlug(tag);
      const summary = bySlug.get(slug);
      if (summary) {
        if (summary.label !== tag) {
          throw new Error(
            `writing: tags "${summary.label}" and "${tag}" share the slug "${slug}".`,
          );
        }
        summary.posts.push(entry);
      } else {
        bySlug.set(slug, { label: tag, slug, posts: [entry] });
      }
    }
  }

  return [...bySlug.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function pageSlice(entries: WritingEntry[], page: number): WritingEntry[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return entries.slice(start, start + POSTS_PER_PAGE);
}

/** Page 1 is `/writing`; later pages live under `/writing/page/<n>`. */
export function pagePath(page: number): string {
  return page <= 1 ? "/writing" : `/writing/page/${page}`;
}
