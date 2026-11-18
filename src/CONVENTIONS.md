# Conventions

The lasting contract for this codebase. Threads 2–5 build on these interfaces
and follow these rules; when an interface changes, this file changes in the same
commit. `DESIGN.md` owns composition; DabDesign, DabFonts, and DabAgents (pins in
`AGENTS.md`) own values, fonts, and process.

## 1. Repository map

| Path | Holds | Owner |
|---|---|---|
| `src/styles/tokens.css` | every design value: colour roles, type roles, space, shape, motion, layout | foundation |
| `src/styles/global.css` | base element styles, link/button conventions, container, prose rhythm, skip link | foundation |
| `src/layouts/BaseLayout.astro` | document shell, head, theme script, skip link, slots | foundation |
| `src/components/` | shared primitives and the header/footer shell | foundation; extension by later threads |
| `src/lib/i18n.ts` | `Locale`, `Localized<T>`, `locales`, `defaultLocale` | foundation; routing by thread 4 |
| `src/lib/metadata.ts` | `PageMeta`, `resolveMeta()` | foundation; OG by thread 5 |
| `src/data/site.ts` | site name, URL, email, role, description | foundation |
| `src/data/social.ts` | `Social[]`, `primary` and `all` | thread 2 renders |
| `src/content/` | content records and copy; collections land in `src/content.config.ts` | threads 2–3 |
| `src/pages/` | routes | threads 2–4 |
| `scripts/check-tokens.mjs` | the token guard behind `pnpm lint` | foundation |

## 2. Tokens

One file declares design values: `src/styles/tokens.css`. It contains the
DabFonts `@font-face` block verbatim, both colour themes, the type roles, space,
sizing, radius, the single shadow, motion, the container, the gutter, and the
measure.

**Use roles, never primitives.** `#1d4ed8`, `18px`, and `letter-spacing` do not
appear outside that file. `pnpm lint` fails on a hex colour, a `letter-spacing`,
or a raw `font-size` in any other `.astro`, `.ts`, `.css`, `.js`, or `.mjs` file
under `src/`.

Two spellings reach the same token:

- CSS: `var(--dab-color-text-primary)`, `var(--dab-space-6)`.
- Tailwind utilities, generated in `tokens.css` under `@theme inline`:
  `text-text-primary`, `bg-background`, `bg-surface`, `border-border`,
  `text-primary-text`, `bg-primary`, `text-on-primary`, `rounded-lg`,
  `shadow-floating`.

The colour utility name is the utility prefix plus the role: `color-text-primary`
→ `text-text-primary`, `color-primary-text` → `text-primary-text`. Spacing
utilities use the core grid: `p-6` is `space-6` (24px), `gap-2` is `space-2`
(8px), `0.5` is the 2px half-step. There is no second spacing scale.

**Type roles** are classes, not utilities, so weight and line height travel with
the size: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-h4`,
`type-body-lg`, `type-body`, `type-body-sm`, `type-label`, `type-caption`. Use
the mapping in `DESIGN.md` §4. `tabular` adds tabular numerals.

**Shape and motion.** Radius ladder `rounded-xs | sm | md | lg | pill` maps to
DabDesign's. One shadow (`shadow-floating`) and one lift (`scale(1.01)`, 300ms,
`easing-standard`) exist; nothing else lifts. `prefers-reduced-motion` removes
movement, not colour feedback.

## 3. Theme contract

- `<html data-theme="light" | "dark">`. Tokens flip on the attribute; components
  need no `dark:` classes.
- Storage key: `theme`, value `light` or `dark`. Absent or unreadable means:
  `prefers-color-scheme: dark` → dark, otherwise light. **Light is the
  fallback.**
- The inline script in `BaseLayout.astro` (824 bytes) sets the attribute in the
  head before first paint, mirrors it to `color-scheme`, follows the system only
  while no explicit choice is stored, and toggles plus persists on click.
- It is the only client JavaScript on the site. A second inline script or a
  hydrated island is an island-budget change, not an implementation detail.
- A `dark:` Tailwind variant exists for the rare non-token case; do not use it
  to restate a role.

## 4. Fonts

The `@font-face` quartet and the `--font-sans` stack are DabFonts 1.0.1
`TYPESETTING.md` §2.1, copied verbatim into `tokens.css`: four faces, 400 and
600, `local("☺")` first in every `src`, `font-display: swap`.

- `BaseLayout` preloads `DabSans-Regular.woff2`; 600 stays `swap`.
- `--font-mono` is Dab Mono plus system monospace and is used only for `code`,
  `pre`, `kbd`, `samp`, and tabular data. Never in the body stack.
- No italics, no synthesized weights, no Astro font pipeline, no CDN.
- Chinese punctuation, CJK–Latin spacing, and weight limits follow DabFonts.

## 5. Interfaces

| Component / module | Props / exports | Guarantees |
|---|---|---|
| `BaseLayout.astro` | `title`, `description`, `path?`, `lang?`; slots `head`, `header`, `footer`, default | charset/viewport, title/description/canonical, font preload, theme script, skip link, `#main`, header/footer fall back to the shell |
| `Container.astro` | `as?` (`div` default, `section`, `header`, `footer`, `main`, `nav`), `class?` | `container-lg` width and the 16/24/32 gutter |
| `Section.astro` | `as?` (`section` default), `spacing?` (`standard` \| `loose` \| `none`), `id?`, `labelledby?`, `class?` | top rhythm: `space-16`, `space-24` from 640 for `loose`, none for `none`; wraps its content in `Container` |
| `SectionHeader.astro` | `label`, `index?`, `id?`, `as?` (`h2` default), `class?` | index + label + 1px rule row; index is accent, decorative, tabular |
| `Prose.astro` | `class?` | `type-body` plus the 36em measure and paragraph rhythm |
| `ContentImage.astro` | `src: ImageMetadata`, `alt`, `width`, `height`, `widths?`, `sizes?`, `loading?`, `class?` | `astro:assets` output, required dimensions and `alt`, 1px `radius-lg` frame |
| `.link`, `.button`, `.button-secondary` | classes | link: accent + underline, 2px offset; buttons: `type-label` typography in markup, 44px minimum, neutral ink or 1px boundary |
| `src/lib/i18n.ts` | `locales`, `Locale`, `defaultLocale`, `Localized<T>` | one vocabulary for locales; no routing |
| `src/lib/metadata.ts` | `PageMeta`, `ResolvedMeta`, `resolveMeta()` | title suffix, absolute canonical from `site.url` |
| `components/home/Hero.astro` | `locale: Locale` | name, role, intro, `now`, contact links, and the portrait in the DESIGN.md §7.2 sequence |
| `components/home/WorkList.astro` | `entries: CollectionEntry<"works">[]`, `locale` | one-link rows, 9rem meta column from 640, optional 16:10 cover |
| `components/home/ExperienceList.astro` | `entries: CollectionEntry<"experience">[]`, `locale` | year-range meta, role title, org, summary; same row grammar |
| `src/content.config.ts` | `works`, `experience` collections | Zod schemas mirroring DESIGN.md §10; thread 3 adds `writing` |
| `src/content/profile.ts` | `HomeCopy` and default export | home copy per locale: role, intro, `now`, about, section labels |

Rules: extend a primitive rather than forking it; a new visual need is a token
decision, not a local value; a section composes `Section` + `SectionHeader` +
rows.

## 6. Islands budget

One island of behaviour, zero shipped files:

- the theme toggle, implemented as the inline theme script (824 bytes) plus a
  button; `dist/**/*.js` is empty.

Anything else — audio, command palette, analytics, interactive filter — needs a
recorded decision and its own budget line before it ships.

## 7. File naming and structure

- Components and layouts: `PascalCase.astro`, one component per file.
- Modules: `camelCase.ts`; data modules export a default object plus exported
  types.
- Styles: `kebab-case.css`; only `tokens.css` and `global.css` exist.
- Routes: `src/pages/<path>.astro`; dynamic routes use `[param].astro`.
- No barrels, no `index.ts` re-export files.
- Astro scoped styles do not reach a child component's root element; style that
  root with a namespaced `:global(.block__element)` selector, as `SiteHeader`
  and `SiteFooter` do.

## 8. Content

- `src/content/` is the only home for records and copy. Thread 2 created
  `src/content.config.ts` with `works` and `experience`; thread 3 adds
  `writing/<locale>/` to the same file, never a second config.
- Works are ordered newest first by `year`; experience newest first by `start`.
  Both are sorted at the page, not in the loader.
- A work cover lives beside its record (`src/content/works/<slug>.webp`) so the
  `image()` schema helper resolves it; images are not kept in `public/`.
- `src/data/site.ts` and `src/data/social.ts` hold identity constants only.
- Proper nouns stay untranslated; every other field is `Localized<T>`.
- A missing fact is omitted, never replaced by a placeholder in production.
- Copy voice follows DabAgents rule 07.

## 9. Locale seam

`src/lib/i18n.ts` exports the types and the locale list. There is no routing,
no `/zh`, no translation loading, and no language switch: thread 4 owns them.
Until then `BaseLayout` takes `lang` (default `en`) and every page is one
locale. Do not hardcode a second locale's strings into components; add them to
`src/content/`.

## 10. Metadata

Every page passes `title`, `description`, and `path` to `BaseLayout`;
`resolveMeta()` appends the site name and builds the canonical URL. Extra head
tags go in the `head` slot. Thread 5 adds Open Graph, `hreflang`, JSON-LD,
`theme-color`, sitemap, and robots there or in the helper — it does not replace
the props shape.

## 11. Gates

| Command | Runs |
|---|---|
| `pnpm dev` | Astro dev server |
| `pnpm build` | static build to `dist/` |
| `pnpm preview` | serve `dist/` |
| `pnpm lint` | `scripts/check-tokens.mjs` |
| `pnpm typecheck` | `astro sync && tsc --noEmit` |
| `pnpm check` | lint + typecheck + build; CI runs exactly this |

`@astrojs/check` is not a dependency (see the exception in `AGENTS.md`); the
build's compiler catches template errors.

## 12. Accessibility and layout invariants

- Skip link is the first focusable element; `#main` takes focus.
- Visible focus: 2px `color-focus` outline, 2px offset, never removed.
- Icon-only controls carry `aria-label` and a 44×44 target (the theme toggle
  does).
- The accent appears in at most three places per screen: section index, inline
  links, current nav item. A fourth is a defect.
- Body copy holds the 36em measure; nothing else claims a second measure.
- No horizontal scroll at 320px or at 200% zoom; layouts are verified at 375,
  390, 640, 768, 1024, 1280, and 1536 whenever UI changes.
- Status is carried by text, not colour alone.

## 13. Measured contrast

Measured 2026-11-19 with the WCAG 2.2 formula on the token values above, not on
estimates. Text pairs need 4.5:1, non-text 3:1.

| Pair | Light | Dark | Minimum |
|---|---:|---:|---|
| `text-primary` on `background` | 17.18:1 | 18.97:1 | 4.5:1 |
| `text-primary` on `surface` | 17.93:1 | 17.18:1 | 4.5:1 |
| `text-secondary` on `background` | 9.93:1 | 13.36:1 | 4.5:1 |
| `text-secondary` on `surface` | 10.37:1 | 12.09:1 | 4.5:1 |
| `text-tertiary` on `background` | 7.49:1 | 7.85:1 | 4.5:1 |
| `text-tertiary` on `surface` | 7.81:1 | 7.11:1 | 4.5:1 |
| `primary-text` on `background` | 6.42:1 | 10.98:1 | 4.5:1 |
| `primary-text` on `surface` | 6.70:1 | 9.94:1 | 4.5:1 |
| `on-primary` on `primary` | 17.93:1 | 17.18:1 | 4.5:1 |
| `border-strong` on `background` | 4.54:1 | 4.18:1 | 3:1 |
| `border-strong` on `surface` | 4.74:1 | 3.78:1 | 3:1 |
| `focus` on `background` | 3.28:1 | 5.78:1 | 3:1 |
| `focus` on `surface` | 3.42:1 | 5.23:1 | 3:1 |

`border` on `background` is 1.21:1 light and 1.31:1 dark; it is a decorative
divider, not a boundary, and has no minimum.

Viewport and keyboard results from the same run are in the foundation report;
the shell measured no horizontal scroll at 320, 375, 390, 640, 768, 1024, 1280,
or 1536 CSS pixels (200% zoom on a 1280px window is the 640px case).

## 14. Not built here

Home sections are built (thread 2): hero, work, earlier, and about, with contact
links in the hero and the footer. Not built here: the writing list and posts
(thread 3), `/zh` routing (thread 4), OG art, sitemap, robots, Lighthouse and the
domain switch (thread 5).

Open content items, all owner-supplied: a final portrait to replace the CV photo,
date granularity for works and roles (the schema stores a year, the CV has
ranges), and the `02` section slot, which DESIGN.md §6 reserves for Writing and
thread 3 fills.
