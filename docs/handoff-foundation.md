# Handoff — Foundation (thread 1)

**From:** HQ (thread 0, owner).
**To:** Foundation.
**Date:** 2026-11-19.
**Status:** transient working document. Delete after the foundation PR merges.

---

## 1. Where this thread sits

| # | Thread | Owns | Starts |
|---|---|---|---|
| 0 | **HQ** | decisions, ADR/`DEC-`, priorities, merging, bug triage, new requests | always on |
| 1 | **Foundation** ← you | repo, build chain, Dab repos at pins, tokens and fonts, deploy pipeline, deployable empty shell | **first** |
| 2 | Content & Sections | home page: hero, about, work, experience, contact, with real copy | after 1 merges |
| 3 | Blog | article model, MDX/CMS, post and list templates, RSS, tags, pagination | after 1 merges; parallel to 2 |
| 4 | Internationalization | locale routing, copy extraction and translation flow, CJK–Latin typography, language switch | after 2 and 3 are structurally stable |
| 5 | Launch & Polish | SEO/meta/OG, accessibility, Lighthouse, responsive verification, domain switch | after 2 and 3, before the domain |

You are upstream of threads 2–5. Your job is **not** to build the site; it is to
make every later thread cheap, consistent, and deployable. When you finish, the
repo builds, deploys, and exposes a small set of conventions that the other
threads must follow.

`DESIGN.md` describes the **finished** site. This file narrows it to thread 1.
Build the seams now; let the other threads fill them.

## 2. Read order

1. This file.
2. [`DESIGN.md`](../DESIGN.md) — the composition contract. It wins over taste and
   defers to the upstream repos.
3. Upstream at the pins in §8:
   - DabDesign `GUIDELINE.md` → `core.md` → `GOVERNANCE.md` → `DabDesign.md`
     (the approved personal series used here).
   - DabFonts `GUIDELINE.md` → `TYPESETTING.md`.
   - DabAgents `rules/01-operating.md`; follow its routing table for `02`
     engineering, `04` quality, `06` deployment, `09` docs.

Do not load every rule. Do not invent tokens, sizes, breakpoints, or font
loading: they live upstream.

## 3. Repository state

- Branch `rebuild`, created from `main` at `f9feb10`. No upstream configured.
- Working tree has **uncommitted, abandoned edits** from the discarded design
  (`components/`, `data/`, plus untracked `data/experience.ts`). Disposable.
  Do not port them.
- `DESIGN.md` is untracked. Commit it first so the contract has history.
- No project `AGENTS.md`, no pinned dependencies, no `README.md` describing the
  stack. You create the first two.
- Toolchain: Node `24.22.3`, pnpm `12.21.0`. Astro 7 needs Node `>=22.23.4`.
- Reusable facts (keep them, they are not design):
  - DabMusic — https://music.dabaz.me — `public/images/projects/dabmusic.webp`
  - DabSudoku — https://sudoku.dabaz.me — `public/images/projects/dabsudoku.webp`
  - Cyclic — https://cyclic.dabaz.me — `public/images/projects/cyclic.webp`
  - Identity, email `hi@dabaz.me`, socials: `data/social.ts`.
  - DabFonts: `public/fonts/DabSans-*.woff2`, `DabMono-*.woff2`, OFL notices.
  - `styles/fonts/*.ttf` are OG-render fonts only; thread 5 owns OG.
- The Next.js implementation is deleted in full; `git log` stays.

## 4. Decisions already made — do not reopen

| # | Decision | Owner of the finished work |
|---|---|---|
| 1 | **Astro 7.4.x**, fully static, no adapter | you |
| 2 | Tailwind CSS 4 via `@tailwindcss/vite` | you |
| 3 | Shell `container-lg` 1024, `space-6`/`space-8` gutters (≈960 usable) | you |
| 4 | Accent = approved personal-series blue; neutral ink primary | you (tokens) |
| 5 | Neutral-first; accent in at most three places | you (tokens), 2 (usage) |
| 6 | DabFonts only, `@font-face` block verbatim, no Astro font pipeline | you |
| 7 | No monospace in UI; Dab Mono for code and tabular numerals only | you (rule), 2–5 (compliance) |
| 8 | Portrait is required in the hero | 2 (asset and placement) |
| 9 | Writing ships in v1 as home list + `/writing` + post pages | 3 |
| 10 | Work is a list only, no case-study pages | 2 |
| 11 | Light default when no system preference; system wins; choice persists | you |
| 12 | Old Next.js app deleted, not migrated | you |
| 13 | Two locales, `/` and `/zh` | 4 (routing), 2–3 (strings) |

## 5. Scope for this thread

Build:

1. Remove the Next.js tree and its config/lockfiles; keep `.git`, `.vercel`,
   `LICENSE`, `DESIGN.md`, reusable assets.
2. Fresh Astro 7 project at the repo root, static output, pinned versions.
3. **Design tokens**: one stylesheet with the semantic roles used by this site,
   mapped from DabDesign. No primitive hex inside components.
4. **Fonts**: DabFonts' loading block verbatim, self-hosted, regular preloaded,
   600 via `swap`, `local("☺")` first in every `src`.
5. **Base layout**: document shell, head slot, skip link, focus styles, theme
   script (inline, <1 KB, no flash), background/foreground from tokens.
6. **Reusable primitives** that threads 2–5 compose with, not the final
   sections: `Container`, `Section`, `SectionHeader`, a prose/measure wrapper,
   link and button conventions, and an image component wrapper.
7. **Deploy pipeline**: build command, CI workflow (type check + build), Vercel
   static preview. A PR preview URL must work.
8. **Conventions**: `AGENTS.md` with the three pins, `README.md` with stack and
   commands, a short `src/CONVENTIONS.md` covering token usage, island budget,
   file naming, where content lives, and the interface list from §6. This file
   is deleted after merge, so the conventions must outlive it.
9. **Deployable empty shell**: header, empty main slot, footer. Minimal identity
   (site name and role) only; no home sections, no invented copy.

Do not build:

- Hero, about, work list, experience, contact, or any home section (thread 2).
- Article model, MDX/MDX pipeline, RSS, tags, pagination (thread 3).
- Locale routing, `/zh`, copy extraction, translation flow, language switch
  (thread 4). Leave a seam; do not implement it.
- Final OG art, SEO audit, accessibility audit, Lighthouse work, domain switch
  (thread 5). Provide the metadata slot and a working default; stop there.
- Any new feature: audio, command palette, analytics, CMS, auth, database.

## 6. Interfaces you must hand over

Threads 2–5 will build directly on these. Name them, document them in
`src/CONVENTIONS.md`, and keep them stable. This handoff file is deleted after
merge; the conventions file is the lasting contract.

| Surface | What it must guarantee |
|---|---|
| `src/styles/tokens.css` | One file, semantic roles only, both themes; nothing else declares color |
| Font loading | `@font-face` from DabFonts, unchanged; `font-sans` is Dab Sans; mono stack is Dab Mono |
| `BaseLayout.astro` | `<head>` slot (title/meta/canonical), skip link, header/footer slots, theme class on `<html>` |
| Theme contract | `data-theme="light|dark"` (or class equivalent), persisted key, no flash; document it |
| `Container`, `Section`, `SectionHeader` | Props are semantic; no local spacing values |
| Prose wrapper | Applies the body measure and type roles; used by thread 3 for post bodies |
| Images | `astro:assets` wrapper with explicit dimensions and `alt`; local sources |
| Content location | One documented directory for content modules/collections; threads 2 and 3 add entries, not new patterns |
| Locale seam | `Locale` and `Localized<T>` types exported once (from `DESIGN.md` §10), no routing yet |
| Metadata | A helper or props shape for title/description/canonical that thread 5 extends with OG |
| Scripts | `dev`, `build`, `preview`, `check`, `lint` (if any), all documented and CI-wired |

If a later thread needs a new primitive, it composes from tokens; it does not
fork yours.

## 7. Acceptance criteria

Run these yourself and paste the output in the report:

1. `pnpm install && pnpm run check && pnpm run build` pass from a clean clone.
2. `/` builds as static HTML, deploys to a Vercel **preview**, and returns 200.
3. Built output contains **no client JavaScript** except the theme script
   (`dist/**/*.js` checked; a framework runtime is a defect).
4. No flash of the wrong theme; light is the fallback with no system preference;
   the choice survives reload.
5. No hex, raw type size, `letter-spacing`, or second radius scale in components;
   roles only.
6. Fonts load from `/fonts`; a locally installed family cannot win.
7. Keyboard: skip link, focus visible, 44×44 targets, theme toggle labelled.
8. No horizontal scroll at 320px or 200% zoom; layout holds at the widths in
   DabDesign `core.md` §7.
9. Contrast measured on the real surfaces in both themes; numbers recorded.
10. CI runs on the branch and is green.
11. `AGENTS.md` pins resolve to §8; `README.md` commands are the ones you ran.
12. No Next.js file, dependency, or script remains.

Not yours to prove: full home content, post pages, `/zh`, OG images, Lighthouse,
domain.

## 8. Pins (no releases exist; these are `main` commits)

| Repository | Commit | Date |
|---|---|---|
| DabAgents | `d9811aaef7f443a40a18ad45163cd0e8d82992c9` | 2026-11-15 |
| DabDesign | `a98788746aee0acbee57a228332d518c6a224f66` | 2026-11-15 |
| DabFonts | `562d47047de94c962891ed2f58ef83100dd43b2b` | 2026-11-15 |

Versions at those commits: DabDesign 1.0.1, DabFonts 1.0.1.

Verified today (npm `latest`): `astro` 7.4.13, `@astrojs/sitemap` 3.7.6,
`@tailwindcss/vite` 4.3.5. Pin exact versions; never `latest`.

## 9. Constraints

- Dependency whitelist: `astro`, `tailwindcss`, `@tailwindcss/vite`, `sharp`,
  `typescript`. Add `@astrojs/sitemap` only if you wire sitemap now (it is
  thread 5's call; a placeholder is fine). **No** `@astrojs/react`, `@astrojs/mdx`,
  `next-themes`, `motion`, icon packages, or UI kits. Anything else: ask HQ.
- No component-local design values; tokens are declared once.
- No new ADR or `DEC-` files. Put decisions in the report; HQ records them in
  `DESIGN.md` §15 or DabDesign.
- Do not edit `DESIGN.md`. Propose changes.
- No placeholder content in the build. Temporary fixtures are not committed.
- Do not delete `.git`, `.vercel`, `LICENSE`, `DESIGN.md`, or the DabFonts files.
- Keep `public/images/projects/*.webp`: thread 2 needs them.

## 10. Choices delegated to you

Decide and report:

- Scaffold mechanics (recommended: scaffold in a temp directory, copy in, then
  `git rm` the old tree).
- Directory layout under `src/`.
- Token file organization (single file vs split by role) as long as there is one
  source of truth.
- Theme script injection (`is:inline` vs head snippet) and storage key name.
- Primitive API shapes (props for `Container`, `Section`, `SectionHeader`).
- Whether `@astrojs/sitemap` and a metadata helper land now or in thread 5 (pick
  one and justify).
- CI workflow shape (copy DabAgents `templates/ci.yml` if it fits).
- Vercel config: framework preset only, or an explicit config file.

## 11. Known traps

- `client:*` works only on framework components, not `.astro` components.
- `local("☺")` must stay first in every font `src`, including the 600 face.
- Tailwind 4 + Astro is the Vite plugin; `@astrojs/tailwind` is not the path.
- `astro:assets` requires `sharp` at build time.
- Never add `letter-spacing` to CJK text.
- Never put Dab Mono in the body stack.
- A framework runtime in `dist` means the island budget was broken.
- Vercel preview must not touch the production alias or the domain.

## 12. Blockers

None for this thread. The portrait, work years, and first post belong to threads
2 and 3; do not wait for them. Build the shell without them.

## 13. Suggested order

1. Read `DESIGN.md`; skim DabDesign core §3–§7 and the DabFonts loading block.
2. Delete the Next tree; scaffold Astro; get `check` and `build` green.
3. Tokens, fonts, base layout, theme script.
4. Primitives and conventions.
5. CI + Vercel preview; verify the deployed shell.
6. `AGENTS.md`, `README.md`, conventions doc.
7. Run §7; write the report.

## 14. Reporting back

Reply with:

- branch and PR URL (open a **draft PR** on `rebuild`; HQ merges);
- preview URL;
- commit list (hash + subject);
- exact commands and outcomes, including failures;
- deviations from `DESIGN.md` or this file, each with a reason;
- the delegated choices from §10;
- measured contrast pairs and viewport results;
- the interface list from §6 as actually implemented;
- open questions and anything you did **not** do.

Push the branch and open the PR; do not merge, do not promote to production, do
not touch the domain.
