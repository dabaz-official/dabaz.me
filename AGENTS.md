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

- **Framework:** Astro 7.4.12, `output: "static"`, no adapter
- **Post bodies:** MDX through `@astrojs/mdx` (build-time only; no client
  runtime, `dist/**/*.js` stays empty)
- **Language:** TypeScript, `strict: true`
- **Styling:** Tailwind CSS 4.3.5 through `@tailwindcss/vite`; DabDesign tokens
  declared once in `src/styles/tokens.css`
- **Fonts:** DabFonts 1.0.1, self-hosted in `public/fonts`; `@font-face` block
  verbatim, no Astro font pipeline
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
pnpm check      # the gate: lint + typecheck + build
```

CI (`.github/workflows/ci.yml`) runs `pnpm check` on every pull request.

## Project rules

- **Design values:** only in `src/styles/tokens.css`. Components use roles
  (`var(--dab-color-text-primary)`, `text-text-primary`, `type-body`).
  `pnpm lint` fails the build on a hex colour, `letter-spacing`, or a raw
  `font-size` anywhere else.
- **Client JavaScript:** none. The document ships no script and `dist/**/*.js`
  is empty. No framework integration without a recorded decision.
- **Theme:** pinned to `light`. `BaseLayout` sets `data-theme="light"` and the
  toggle is out; the dark tokens stay for its return. Full contract in
  `src/CONVENTIONS.md`.
- **Interfaces:** `Container`, `Section`, `SectionHeader`, `Prose`,
  `ContentImage`, `BaseLayout`, `src/content/ui.ts`, `src/lib/i18n.ts`,
  `src/lib/metadata.ts`, `src/lib/dates.ts` are the shared surface. Extend
  them; do not fork them.
- **Content:** `src/content/` for records and copy, `src/data/site.ts` and
  `src/data/social.ts` for identity. See `src/content/README.md`.
- **Design ownership:** thread 1.5 (Design Direction) owns composition, rhythm,
  and visual detail; Foundation owns tokens; thread 2 implements the approved
  direction. HQ approves the direction and holds the design veto. A UI change
  without design sign-off does not merge.
- **Threads:** HQ (0) decisions and merging · Foundation (1) system · Design
  Direction (1.5) visual direction · Content & Sections (2) home · Blog (3) ·
  Internationalization (4) · Launch & Polish (5).
- **Scope of the current work:** foundation, home sections, writing, and `/zh`
  are in. OG art and the domain wait for thread 5.

## Definition of Done

- [ ] Acceptance criteria met and reported with the commands that proved them
- [ ] `pnpm check` passes, CI green
- [ ] Responsive checks at 375, 390, 640, 768, 1024, 1280, 1536 plus 320 for
      overflow, and 200% zoom
- [ ] Accessibility: keyboard path, visible focus, 44×44 targets, contrast on
      both themes (DabAgents rule 04, DabDesign `core.md` §9)
- [ ] No client JavaScript
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
