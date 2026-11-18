/**
 * Locale seam — DESIGN.md §10.
 *
 * Exported once so threads 2–5 share one vocabulary. There is deliberately no
 * routing, no `/zh`, and no translation loading here: thread 4 owns those.
 */
export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** A value that exists in every locale. Proper nouns stay plain strings. */
export type Localized<T = string> = { [L in Locale]: T };
