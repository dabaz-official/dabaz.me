# Content home

Everything the pages render as data lives here. This directory has one owner
per kind of record; it does not gain a second pattern.

| Path | Owner | Shape |
|---|---|---|
| `works/*.md` | thread 2 | DESIGN.md §10 `Work`; a `*.webp` cover sits beside each record |
| `experience/*.md` | thread 2 | DESIGN.md §10 `Experience` |
| `profile.ts` | thread 2 | home copy per locale (`HomeCopy`) |
| `ui.ts` | thread 4 | every interface string the shell and shared components render |
| `writing/<locale>/*.mdx` | thread 3 | DESIGN.md §10 `Writing`, plus `tags` and `draft` |
| `src/data/site.ts` | foundation | Site identity; `role` and `description` are copy and `Localized` |
| `src/data/social.ts` | thread 2 | DESIGN.md §10 `Social` |

Rules:

- Collections are defined once, in `src/content.config.ts`, using a schema that
  mirrors DESIGN.md §10. Foundation and thread 2 created it with `works` and
  `experience`; thread 3 added `writing` there, not in a second config.
- No content module lives outside `src/content/` and the two identity files in
  `src/data/`. Interface strings live in `ui.ts`; owner copy lives in
  `profile.ts`, the collections, and `src/data/`. A component never inlines a
  visible or spoken string.
- A post is `writing/<locale>/<slug>.mdx`. The directory must match the
  frontmatter `locale`; `date` is an ISO day (`YYYY-MM-DD` — quote it in YAML),
  `summary` is one sentence for the list and the feed, `tags` are display
  strings, and `draft: true` keeps a post out of production builds.
- `entry.id` is `<locale>/<slug>`. Each locale renders its own prefix
  (`/writing/<slug>` for `en`, `/zh/writing/<slug>` for `zh`) and lists only its
  own posts; the same slug may exist once per locale. Translate a post by
  adding the matching file under the other locale directory — until it exists,
  that locale omits the post and the language switch falls back to the list.
- A missing fact is omitted, never filled with a placeholder in production.
- Proper nouns (`title`, `org`, `tags`, platform labels) stay untranslated;
  everything else is `Localized<T>` from `src/lib/i18n.ts`.

**Adding a locale.** Extend `locales` in `src/lib/i18n.ts` and fill every
`Localized` record: TypeScript fails the build until `ui.ts`, `profile.ts`,
`site.ts`, and the collection frontmatter carry the new key. Add the route tree
under `src/pages/<locale>/` and its label in `homePath()` / the writing path
helpers. There is no silent fallback to English.

**Chinese copy.** Follow DabFonts `TYPESETTING.md` §3–§4: Chinese codepoints,
one U+0020 after every sentence or closing mark followed by text, and one U+0020
between Han and Latin letters or digits. `pnpm lint` runs
`scripts/check-copy.mjs` over this directory and `src/data/`.

`src/CONVENTIONS.md` is the authoritative contract; this file only marks the
directory.
