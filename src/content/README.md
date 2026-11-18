# Content home

Everything the pages render as data lives here. This directory has one owner
per kind of record; it does not gain a second pattern.

| Path | Owner | Shape |
|---|---|---|
| `works/*.md` | thread 2 | DESIGN.md §10 `Work` |
| `experience/*.md` | thread 2 | DESIGN.md §10 `Experience` |
| `writing/<locale>/*.md` | thread 3 | DESIGN.md §10 `Writing` |
| `src/data/site.ts` | foundation | Site identity (name, URL, email) |
| `src/data/social.ts` | thread 2 | DESIGN.md §10 `Social` |

Rules:

- Collections are defined once, in `src/content.config.ts` (thread 3 creates it
  with the first collection), using a schema that mirrors DESIGN.md §10.
- No content module lives outside `src/content/` and the two identity files in
  `src/data/`. Copy strings belong to `src/content/`; interface strings follow
  DESIGN.md §10 and thread 4's extraction flow.
- A missing fact is omitted, never filled with a placeholder in production.
- Proper nouns (`title`, `org`) stay untranslated; everything else is
  `Localized<T>` from `src/lib/i18n.ts`.

`src/CONVENTIONS.md` is the authoritative contract; this file only marks the
directory.
