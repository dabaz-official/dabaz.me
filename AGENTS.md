# AGENTS.md — Project Contract

This is the only document an agent must read before starting; it pins
everything else. Design values live in the pinned repositories, not here.

## Project

- **Name:** dabaz.me
- **Purpose:** personal site of DabAZ — work, writing, and contact.
- **Repo:** https://github.com/dabaz-official/dabaz.me
- **Canonical URL:** https://dabaz.me
- **Primary locale:** `en`; `zh` ships at `/zh` (thread 4)
- **Owner:** dabaz-official

## Required reading (in order)

1. **DabAgents** @ `d9811aaef7f443a40a18ad45163cd0e8d82992c9` —
   https://github.com/dabaz-official/DabAgents; start at `rules/01-operating.md`,
   which routes to the other rules.
2. **DabDesign** @ `a98788746aee0acbee57a228332d518c6a224f66` —
   https://github.com/dabaz-official/DabDesign; start at `GUIDELINE.md`. For
   this site also read `DabDesign.md` (personal series, approved theme).
3. **DabFonts** @ `562d47047de94c962891ed2f58ef83100dd43b2b` —
   https://github.com/dabaz-official/DabFonts; start at `GUIDELINE.md`, then
   `TYPESETTING.md`.

Versions at those commits: DabDesign 1.0.1, DabFonts 1.0.1, DabAgents 1.0.2.

## Stack

- **Framework:** Astro 7.4.13, `output: "static"`, no adapter
- **Post bodies:** MDX through `@astrojs/mdx` (build-time only; it contributes
  no client runtime and no bundle of its own)
- **Language:** TypeScript, `strict: true`
- **Styling:** Tailwind CSS 4.3.5 through `@tailwindcss/vite`; DabDesign tokens
  declared once in `src/styles/tokens.css`
- **Fonts:** DabFonts 1.0.1, self-hosted in `public/fonts`; `@font-face` block
  verbatim, no Astro font pipeline. The two home routes add a generated subset
  (`DabSansHome-*.woff2`, `scripts/home-glyphs.txt`); every other route uses
  the full faces. Regenerate with `pnpm build && pnpm glyphs && pnpm subset`
  (`scripts/requirements.txt` provides fonttools + brotli); `pnpm check` fails
  when a rendered home character is missing from the list.
- **Voice:** DabAgents rule 07
- **Package manager:** pnpm 12.21.0 (`packageManager`)
- **Node:** 24 (`.nvmrc`); Astro 7 requires `>=22.23.4`
- **Deploy:** Vercel, framework preset `astro`, preview per branch

## Commands

```sh
pnpm dev        # local dev server
pnpm build      # static build to dist/
pnpm preview    # serve dist/ locally
pnpm lint       # token guard + Chinese punctuation/CJK–Latin spacing guard
pnpm typecheck  # astro sync && tsc --noEmit
pnpm icons      # export favicon, Apple icon, and manifest icons from public/icon.svg
pnpm og         # render public/og/en.png and zh.png (needs Chrome)
pnpm glyphs     # refresh scripts/home-glyphs.txt from dist/ (run after a build)
pnpm subset     # regenerate the two home font subsets (needs scripts/requirements.txt)
pnpm check      # the gate: lint + typecheck + build + metadata + home-subset guard
```

CI (`.github/workflows/ci.yml`) runs `pnpm check` on every pull request.

## Project rules

- **Design values:** only in `src/styles/tokens.css`. Components use roles
  (`var(--dab-color-text-primary)`, `text-text-primary`, `type-body`).
  `pnpm lint` fails the build on a hex colour, `letter-spacing`, or a raw
  `font-size` anywhere else.
- **Client JavaScript:** four artifacts, and nothing else. `BaseLayout` ships
  a one-line inline bootstrap that swaps `no-js` for `js` before paint; `/` and
  `/zh` carry the work showcase module (bundled, and inlined by Astro while it
  stays this small) that adds the gallery's tab behaviour; `/` and `/zh` carry
  one inline script that flips the header's `data-past` once the first screen
  is behind, so its scrim fades from the band tone to white over 500ms; and a
  post page carries one inline script for its copy-link button. Everything
  renders, reads and scrolls without them. `scripts/check-meta.mjs` allows
  exactly those four artifacts and fails on any other script or bundle. No
  framework integration, router, or analytics; a new script is a new budget
  line and needs a recorded decision here.
- **Theme:** pinned to `light`. `BaseLayout` sets `data-theme="light"` and the
  toggle is out; the dark tokens stay for its return. It also declares
  `color-scheme: light dark` in `<head>` and on `:root`: that is the declaration
  Safari 27.3's Adaptive Dark Mode honours, so the page is not repainted for a
  visitor on a dark system. Do not "fix" it to `light`. Full contract in
  `src/CONVENTIONS.md`.
- **Interfaces:** `Container`, `Section`, `SectionHeader`, `Prose`,
  `ContentImage`, `PillButton`, `BaseLayout`, `src/content/ui.ts`,
  `src/lib/i18n.ts`, `src/lib/metadata.ts`, `src/lib/dates.ts` are the shared
  surface. Extend them; do not fork them.
- **Content:** `src/content/` for records and copy, `src/data/site.ts` and
  `src/data/social.ts` for identity. See `src/content/README.md`.
- **Design ownership:** the owner owns composition, rhythm, and visual detail;
  Foundation owns tokens; thread 2 implements the approved direction. HQ records
  the direction and holds the merge veto. A UI change without design sign-off
  does not merge.
- **Threads:** HQ (0) decisions and merging · Foundation (1) system · Design
  Direction (1.5, archived exploration) · Content & Sections (2) home · Blog
  (3) · Internationalization (4) · Launch & Polish (5).
- **Scope of the current work:** the site is live on `dabaz.me` — foundation,
  home, writing, `/zh`, and the launch surface are in, and the domain is
  switched. Remaining work is maintenance and polish, not a thread deliverable.

## Definition of Done

- [ ] Acceptance criteria met and reported with the commands that proved them
- [ ] `pnpm check` passes, CI green
- [ ] Responsive checks at 375, 390, 640, 768, 1024, 1280, 1536 plus 320 for
      overflow, and 200% zoom
- [ ] Accessibility: keyboard path, visible focus, 44×44 targets, contrast on
      the pinned light theme (re-measure when dark returns) (DabAgents rule 04,
      DabDesign `core.md` §9)
- [ ] Client JavaScript stays inside the one-module budget, and every surface
      still works with scripting off
- [ ] Copy follows DabAgents rule 07; Chinese copy follows DabFonts
- [ ] `src/CONVENTIONS.md` updated when an interface changes
- [ ] Design sign-off recorded for every UI change, with screenshots at 375,
      768, 1024, and 1440 plus one sentence of intent per section
- [ ] Preview deployment checked for UI changes
- [ ] No secrets, debug logs, or commented-out code

## Exceptions

- **Glass header.** Rule: DabDesign `DabDesign.md` §1 bans glassmorphism and
  DESIGN.md §3 previously banned `backdrop-filter`. Reason: the owner approved a
  translucent, blurred header so content stays visible while scrolling; the
  scrim stays at 80% or higher, contrast is measured over the composited
  surface, and unsupported or reduced-transparency clients get an opaque bar.
  Scope: the `<header>` only, never a card, dialog, footer, or toast.
  Owner: HQ. Review: 2026-12-19. A `DEC-` upstream is still open.
- **`astro check` gate.** Rule: DESIGN.md §12 lists `astro check` as blocking.
  Reason: `@astrojs/check` is outside the foundation dependency whitelist, so
  the gate is `astro sync && tsc --noEmit && astro build`; template errors are
  caught by the Astro 7 compiler at build time. Owner: HQ. Review: 2026-12-19.
- **Metadata colour mirror.** Rule: design values live only in
  `src/styles/tokens.css`. Reason: `<meta name="theme-color">` and the web
  manifest need a literal, and neither can read a custom property; the two
  values mirror `--dab-color-background` and appear only in `src/data/site.ts`
  and `public/site.webmanifest`. The token guard does not scan `public/`.
  Owner: HQ. Review: 2026-12-19.
- **Two-tone text scale.** Rule: DabDesign `core.md` §3.3 fixes three text
  tiers (`text-primary` / `text-secondary` / `text-tertiary`) and §1.2 allows a
  theme to remap only the accent and surface-tint entries. Reason: `gray-700`
  and `gray-600` sit 18 steps apart and read as one tone, so the page shows
  near-black plus two interchangeable grays. The site follows Apple's system —
  one near-black for structure, one quiet tone for everything supporting, with
  hierarchy carried by size and weight — and maps both text tiers to `#6f6f6f`
  (4.81:1 on the background, 5.02:1 on a surface; dark `gray-400`, 7.85:1 and
  7.11:1). Scope: those two roles only; `text-primary`, `text-inverse`,
  `text-disabled`, and every other role keep the DabDesign value. Owner: HQ.
  Review: 2026-12-19. No upstream `DEC-`: the owner chose a project-local
  override, and DabDesign is not modified on this branch.
- **White page surface.** Rule: DabDesign `core.md` §3.3 fixes
  `color-background` to `gray-50`. Reason: the site pairs pure white with
  `gray-100` bands, the way Apple does, so a band sits 3.5 ΔE76 from the page
  instead of 1.7 — at `gray-50` a `gray-100` band is indistinguishable, which
  is what made the tone look absent. Scope: `color-background` in the light
  theme only; every other role keeps its DabDesign value, and `themeColor` plus
  the manifest mirror the same literal as before. Owner: HQ. Review:
  2026-12-19. No upstream `DEC-`: the owner chose a project-local override.
- **English opening-mark spacing.** Rule: DabFonts `TYPESETTING.md` §0 says an
  opening bracket or quote hugs the preceding text (`睡眠（REM）`,
  `所谓“涌现”`). Reason: the site sets the open mark the English way instead —
  one U+0020 before `（` `“` `《` when it follows text, zero after it, the way an
  English page writes `sleep (REM)` and `he said "no"`. A bracket or a quoted
  phrase then reads as its own unit beside the Han around it, which is how Dab
  Sans already sets Latin. Scope: Chinese copy in `src/content/` and
  `src/data/`, enforced by `scripts/check-copy.mjs`; a mark that opens or
  closes a run of `**` keeps its markup boundary, so the space the mark needs
  sits after the closing run (`**程序管理器 （Program Manager）**——`), and `——`
  keeps no space. Owner: HQ. Review:
  2026-12-19. A `DEC-` upstream is still open: the fix belongs in DabFonts §0,
  not in a per-site guard, and this entry retires when it lands.
