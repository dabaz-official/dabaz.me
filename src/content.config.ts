import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { works, experience };
