import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { locales } from "./lib/i18n";

/**
 * Content collections — DESIGN.md §10.
 *
 * `works` and `experience` land here in thread 2; thread 3 adds
 * `writing/<locale>/`. The schema mirrors the record types in DESIGN.md §10
 * exactly: add a field only after the model changes upstream.
 */

/** A field that exists in every locale (DESIGN.md §10 `Localized`). */
const localized = z.object({ en: z.string(), zh: z.string() });

const works = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().int().optional(),
      role: localized,
      org: z.string().optional(),
      summary: localized,
      /** Card labels in the home grid, e.g. ["Game", "Web"]. */
      tags: z.array(z.string()).default([]),
      href: z.string().url().optional(),
      cover: z
        .object({
          src: image(),
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
 * `draft` are the two additions the blog needs; neither is a required fact.
 */
const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writing",
  }),
  schema: z.object({
    title: z.string().min(1),
    locale: z.enum(locales),
    date: isoDay,
    summary: z.string().min(1),
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

export const collections = { works, experience, writing };
