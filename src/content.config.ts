import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { locales } from "./lib/i18n";

/**
 * Content collections — DESIGN.md §10.
 *
 * `works` and `experience` land here in thread 2; thread 3 adds
 * `writing/<locale>/`; the work case studies live in `work-details/<locale>/`.
 * The record schemas mirror the record types in DESIGN.md §10: add a field
 * only after the model changes upstream.
 */

/** A field that exists in every locale (DESIGN.md §10 `Localized`). */
const localized = z.object({ en: z.string(), zh: z.string() });

/** A list of labels that exists in every locale, e.g. work card tags. */
const localizedList = z.object({
  en: z.array(z.string().min(1)),
  zh: z.array(z.string().min(1)),
});

/** A calendar month in a record: `YYYY-MM`. */
const isoMonth = z.string().regex(/^\d{4}-\d{2}$/, "use an ISO month: YYYY-MM");

/** The quarter a work shipped: `YYYY-Qn`. */
const isoQuarter = z
  .string()
  .regex(/^\d{4}-Q[1-4]$/, "use a calendar quarter: YYYY-Qn");

const works = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** The ship year: the card's year and the order fallback. */
      year: z.number().int().optional(),
      /**
       * The months the project ran, `YYYY-MM`. A work is planned in quarters,
       * not stamped to a day; omit `end` while the project is ongoing.
       */
      start: isoMonth.optional(),
      end: isoMonth.optional(),
      /** The quarter it shipped, `YYYY-Qn`: the project page's second line. */
      shipped: isoQuarter.optional(),
      /**
       * Curated display order in the home showcase and the `/work` grid: lower
       * first. Omit to fall back to newest year first (`src/lib/works.ts`).
       */
      order: z.number().int().optional(),
      role: localized,
      org: z.string().optional(),
      summary: localized,
      /** Card labels in the home grid, e.g. ["Game", "Web"] / ["游戏", "网页"]. */
      tags: localizedList.default({ en: [], zh: [] }),
      href: z.string().url().optional(),
      cover: z
        .object({
          src: image(),
          /**
           * The same screen captured in the dark theme. Omitted when the
           * project has no light/dark pair (Cyclic ships dark only), and the
           * light capture then serves both themes.
           */
          dark: image().optional(),
          alt: localized,
        })
        .optional(),
      status: z.enum(["live", "archived"]),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/experience" }),
  schema: z.object({
    org: z.string(),
    role: localized,
    start: z.number().int(),
    end: z.union([z.number().int(), z.literal("now")]),
    href: z.string().url().optional(),
    summary: localized.optional(),
  }),
});

/** A calendar day, always a `YYYY-MM-DD` string in the record (DESIGN.md §10). */
const isoDay = z.preprocess(
  // YAML parses an unquoted ISO day as a Date; quote the frontmatter or let
  // this normalise it. A day never carries a time or a zone.
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use an ISO day: YYYY-MM-DD"),
);

/**
 * Writing — one file per post per locale (DESIGN.md §10 `Writing`).
 *
 * `date` stays an ISO 8601 day string, as in the model; ISO dates sort
 * lexicographically, so no timezone ever shifts a publication day. `tags` and
 * `draft` are the two additions the writing section needs; neither is a
 * required fact.
 */
const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writing",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      locale: z.enum(locales),
      date: isoDay,
      summary: z.string().min(1),
      /** The home card's 16:9 image; the card crops whatever it gets. */
      cover: z
        .object({
          src: image(),
          /** Alt text in the post's own language. */
          alt: z.string().min(1),
        })
        .optional(),
      tags: z
        .array(z.string().min(1))
        .refine(
          (tags) =>
            new Set(tags.map((tag) => tag.trim().toLowerCase())).size ===
            tags.length,
          "tags must be unique within a post",
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

/**
 * Work case studies — the long form, one file per locale.
 *
 * The facts stay in `works`; this collection holds the prose, keyed
 * `<locale>/<slug>` so a project page renders only its own language and never
 * the other locale's draft (rule 07 §1).
 */
const workDetails = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/work-details",
  }),
  schema: z.object({
    locale: z.enum(locales),
  }),
});

export const collections = { works, experience, writing, workDetails };
