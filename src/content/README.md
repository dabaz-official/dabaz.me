# Content home

Everything the pages render as data lives here. This directory has one owner
per kind of record; it does not gain a second pattern.

| Path | Owner | Shape |
|---|---|---|
| `works/*.md` | thread 2 | DESIGN.md §10 `Work`; a `*.webp` cover sits beside each record |
| `experience/*.md` | thread 2 | DESIGN.md §10 `Experience` |
| `profile.ts` | thread 2 | home copy per locale (`HomeCopy`) |
| `writing/<locale>/*.mdx` | thread 3 | DESIGN.md §10 `Writing`, plus `tags` and `draft` |
| `src/data/site.ts` | foundation | Site identity (name, URL, email) |
| `src/data/social.ts` | thread 2 | DESIGN.md §10 `Social` |

Rules:

- Collections are defined once, in `src/content.config.ts`, using a schema that
  mirrors DESIGN.md §10. Foundation and thread 2 created it with `works` and
  `experience`; thread 3 added `writing` there, not in a second config.
- No content module lives outside `src/content/` and the two identity files in
  `src/data/`. Copy strings belong to `src/content/`; interface strings follow
  DESIGN.md §10 and thread 4's extraction flow.
- A post is `writing/<locale>/<slug>.mdx`. The directory must match the
  frontmatter `locale`; `date` is an ISO day (`YYYY-MM-DD` — quote it in YAML),
  `summary` is one sentence for the list and the feed, `tags` are display
  strings, and `draft: true` keeps a post out of production builds.
- `entry.id` is `<locale>/<slug>`, so a file name is a URL segment. Two locales
  cannot reuse a slug until thread 4 routes `/zh/writing/<slug>`; the build
  fails with a message if they do.
- A missing fact is omitted, never filled with a placeholder in production.
- Proper nouns (`title`, `org`) stay untranslated; everything else is
  `Localized<T>` from `src/lib/i18n.ts`.

`src/CONVENTIONS.md` is the authoritative contract; this file only marks the
directory.
