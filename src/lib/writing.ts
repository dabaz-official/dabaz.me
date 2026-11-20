/**
 * Writing helpers — one place that turns the `writing` collection into the
 * URLs and strings the pages and the feed share.
 *
 * This module owns the route shape for posts, tags, and pagination. Locale
 * routing is thread 4's: a post is listed under its own locale only
 * (`/writing` for `en`, `/zh/writing` for `zh`) and never falls back to the
 * other language (DESIGN.md §10, §11).
 */
import type { CollectionEntry } from "astro:content";
import { localePath, otherLocale, type Locale } from "./i18n";

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

    // The same slug may exist once per locale; the locale is the route prefix.
    const key = `${entry.data.locale}/${postSlug(entry)}`;
    const existing = seen.get(key);
    if (existing) {
      throw new Error(
        `writing: "${entry.id}" and "${existing.id}" share the slug "${postSlug(entry)}" in the same locale.`,
      );
    }
    seen.set(key, entry);
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

/**
 * The published posts that belong to one locale. A post written in the other
 * language is omitted, not translated or shown as a fallback.
 */
export function postsForLocale(
  entries: WritingEntry[],
  locale: Locale,
): WritingEntry[] {
  return entries.filter((entry) => entry.data.locale === locale);
}

/** URL segment: the file name, shared across locales by the model. */
export function postSlug(entry: WritingEntry): string {
  return entry.id.split("/").pop() ?? entry.id;
}

/** `/writing` or `/zh/writing`. */
export function writingPath(locale: Locale): string {
  return localePath(locale, "/writing");
}

/** Post URL, prefixed for the locale it was written in. */
export function postPath(entry: WritingEntry): string {
  return `${writingPath(entry.data.locale)}/${postSlug(entry)}`;
}

/** A tag's URL segment: lowercase, spaces to hyphens, CJK preserved. */
export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

/** `/writing/tag/<slug>` or `/zh/writing/tag/<slug>`. */
export function tagPathFromSlug(slug: string, locale: Locale): string {
  return `${writingPath(locale)}/tag/${encodeURIComponent(slug)}`;
}

export function tagPath(tag: string, locale: Locale): string {
  return tagPathFromSlug(tagSlug(tag), locale);
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

export function pageSlice(
  entries: WritingEntry[],
  page: number,
): WritingEntry[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return entries.slice(start, start + POSTS_PER_PAGE);
}

/** Page 1 is the list; later pages live under `<list>/page/<n>`. */
export function pagePath(page: number, locale: Locale): string {
  return page <= 1
    ? writingPath(locale)
    : `${writingPath(locale)}/page/${page}`;
}

/**
 * The language switch's target for a post: the translation when it exists,
 * otherwise the other locale's writing list. A missing translation never
 * links to a 404.
 */
export function alternatePostPath(
  entry: WritingEntry,
  published: WritingEntry[],
): string {
  const target = otherLocale(entry.data.locale);
  const twin = published.find(
    (candidate) =>
      candidate.data.locale === target &&
      postSlug(candidate) === postSlug(entry),
  );
  return twin ? postPath(twin) : writingPath(target);
}

/** The language switch's target for a tag page: the same tag there, or the list. */
export function alternateTagPath(
  slug: string,
  locale: Locale,
  published: WritingEntry[],
): string {
  const target = otherLocale(locale);
  const exists = published.some(
    (entry) =>
      entry.data.locale === target &&
      entry.data.tags.some((tag) => tagSlug(tag) === slug),
  );
  return exists ? tagPathFromSlug(slug, target) : writingPath(target);
}
