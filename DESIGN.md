# DESIGN.md — dabaz.me

**Status:** Draft 0.3 · 2026-11-21
**Scope:** the rebuilt `dabaz.me` on branch `rebuild` (Astro). It supersedes the
Next.js implementation shipped in PR #3–#5 in full, not in part.
**Normative upstream:** [DabDesign](https://github.com/dabaz-official/DabDesign)
`core.md` v1.0.1 + `DabDesign.md` (personal series) v1.0.1, and
[DabFonts](https://github.com/dabaz-official/DabFonts) v1.0.1.
**This file owns:** composition, section order, component patterns, content
model, and the Astro mapping. It restates no token value, type size, breakpoint,
or font-loading rule. Where this file and an upstream file disagree, upstream
wins; the fix is a `DEC-` in DabDesign's `GOVERNANCE.md`, not a local override.

---

## 1. Principles

1. **Neutral first.** The page is built from one gray scale and one surface
   step. Color is punctuation, not structure.
2. **One accent, three places.** The accent appears in the section index, inline
   link text, and the current navigation item. Nowhere else — no accent fills,
   headings, buttons, or backgrounds.
3. **Content carries the design.** Typography and spacing do the work; no
   gradient meshes, no glass, no decorative illustration, no scroll effects.
4. **Flat at rest.** Separation comes from 1px borders and surface steps. The
   single shadow is reserved for the interactive-card hover, per upstream core.
5. **Dated and factual.** Work is a list of things that exist, with years and
   links. No invented metrics, no adjectives standing in for evidence.
6. **Fast is part of the look.** Static HTML, self-hosted fonts, no client
   runtime outside explicitly marked islands.

## 2. References and what we take from each

These are prior art, not standards. Each borrow is translated into DabDesign
tokens; nothing is copied as a value.

| Source | Measured | We take | We drop |
|---|---|---|---|
| craigweiss.dev | 680px column, 20px gutters; mono meta at 12–14px; accent used only as `>`, `/`, `//` prefixes; 1px hairline rows | Accent discipline, restrained palette, dated rows, small-type meta | Mono for UI labels (DabDesign reserves mono), terminal prefixes, 680px column |
| arisacoba.com | shell 64em→60em (≈1024→960), 60–80px padding, ≈800px content; borders 1.5px; radii 4/6/12/20; near-black `#090E24` on white | Moderate shell width, generous outer padding, calm gray-on-white, round portrait, thumbnail rows | 1.5px borders (core: 1px), its type scale, its blue `#283CFF` |
| muhid.de | card radii 20–24px, 1.5px off-white borders, pill chips, avatar rings, one soft shadow | Card anatomy, thumbnail treatment, section density, friendly rhythm | Rose/blue dual accent, pill chips (core: pills are actions only), 1.5px borders |

The synthesis: **Craig's restraint, Aris's width and calm, Muhid's component
anatomy.**

## 3. Color

Roles come from DabDesign core §3.3; the accent mapping comes from
`DabDesign.md` §2 (blue, neutral-ink primary). No hex is written here.

- Surfaces: `color-background` page, `color-surface` for raised blocks,
  `color-surface-secondary` only for nested blocks. No tinted bands.
- Text: `color-text-primary` body and headings, `color-text-secondary`
  supporting copy, `color-text-tertiary` metadata that still clears 4.5:1.
- Borders: `color-border` for dividers, `color-border-strong` only where a
  boundary must be perceived (inputs, the current row marker).
- Accent: `color-primary-text` for inline links and the section index.
  `color-primary` is the neutral ink fill for the one primary action and is
  never a background wash.
- Focus, selection: core-fixed. Never overridden, never accented.

**Accent budget (hard rule).** A screen may show the accent in at most three
places: a section index, inline links, the current nav item. If a fourth appears,
remove it.

**Theme.** Light only. `<html>` carries `data-theme="light"`; there is no
toggle, no stored preference, and no inline script. The dark role values stay in
`tokens.css` for a possible return, but they are dormant: no page resolves to
dark and the system preference is ignored. Restoring dark mode is not a styling
change — it needs a recorded decision and a stated script budget. No gradient
overlays.

**Glass is allowed in exactly one place: the site header** (§7.1). Every other
surface — footer, cards, dialogs, toasts — stays opaque. Upstream
`DabDesign.md` §1 still bans glassmorphism, so this is a recorded project
exception (`AGENTS.md` → Exceptions) with an open `DEC-` upstream; it is not a
licence to blur anything else.

**Decided 2026-11-19:** the accent hue is the approved personal-series blue.
craigweiss.dev's teal is out of scope; adopting it would need a `DEC-` plus a
measured contrast table in the pinned light theme, and again if dark returns.

## 4. Typography

Families and loading are DabFonts'; roles and values are DabDesign core §4.
This site adds only a mapping:

| Slot | Role |
|---|---|
| Name in the hero | `type-display` |
| Section titles | `type-h2` |
| Work titles | `type-h3` |
| Supporting role line | `type-h4` |
| Intro paragraph | `type-body-lg` |
| Body copy | `type-body` (measure 34–38em) |
| Work summaries, captions under images | `type-body-sm` |
| Nav items, section labels, buttons | `type-label` |
| Years, dates, "built" stamp | `type-caption` with tabular numerals |

Rules:

- One sans family; no second display face, no italics (Dab Sans has none).
- **No monospace in UI.** Dab Mono is for `code` / `pre` / tabular numerals only.
  Metadata uses `type-caption` in the sans.
- Tracking stays zero everywhere; uppercase is a content decision, not a type
  token, and never carries added letter-spacing.
- Chinese copy follows DabFonts: Chinese punctuation, one space between Han and
  Latin, no `text-autospace`.

## 5. Layout

- **Shell:** `container-lg` (1024) with `space-6` gutters from 640 and `space-8`
  from 1024, giving ≈960px of usable width — Aris's moderate width, expressed in
  core containers rather than a new raw value.
- **Text column:** capped at the core measure (34–38em). The work list, header,
  and footer may use the full shell; prose may not.
- **Section rhythm:** `space-16` between sections, `space-24` from hero to the
  first section (matches the approved personal-series composition).
- **Page edges:** the header, content, and footer share one left edge. No
  centered-only hero; the identity block is left-aligned.
- **Responsive:** single column below 640; the work row splits into
  meta + content columns from 640. Nothing is hidden on mobile that carries
  meaning.
- Verify at the widths and zoom levels named in DabDesign core §7, including
  320px overflow.

## 6. Page structure

```
Header        name · nav                     (sticky)
Hero          name, role line, intro, now, portrait, links
Work          dated list of shipped things     (01)
Writing       dated list of posts              (02)
Earlier       roles timeline, only if data     (03)
About         short prose                      (04)
Footer        contact, socials, ©, built date
```

Writing is in scope for v1: a dated list on the home page and one static page per
post. The home list shows the newest three and links to `/writing` when there are
more. A locale with no published posts renders no Writing section at all; an
empty heading is never shown.

No audio engine, boot sequence, command palette, scramble text, console easter
egg, or terminal bar in this rebuild. If one returns, it returns as an explicitly
budgeted island with its own justification — not as page furniture.

## 7. Components

Every component is a composition of upstream tokens. No component-local colors,
radii, or type sizes.

### 7.1 Header

- **Sticky** at the top; height `space-16`; one 1px bottom border. Content
  scrolls under it, which is what makes the glass legible.
- Glass: background `--dab-header-bg` (page background at 80% minimum, defined
  in `tokens.css`), `backdrop-filter: blur(16px) saturate(1.8)` via
  `--dab-header-blur`. Text sits on the scrim, never on raw content.
- Fallbacks: no `backdrop-filter` support or `prefers-reduced-transparency:
  reduce` renders the header fully opaque. Never rely on the blur for contrast.
- Contrast is measured over the composited scrim in the pinned light theme; the
  scrim may not drop below 80% until it is re-measured. Re-measure when dark
  returns.
- Left: wordmark, `type-h4`, weight 600.
- Right: nav (`type-label`, `color-text-secondary`, current item
  `color-text-primary` with an accent marker). No theme control: the theme is
  fixed (§3).
- Anchored sections set `scroll-margin-top` to the header height plus
  `space-4`, so a jump never hides a heading under the bar.

### 7.2 Hero

- Top padding `space-24` at desktop, `space-16` below 640.
- Sequence: name → role line (`role @ org`, org as an inline link) → intro
  (≤34em) → `now` line → links.
- `now` line: `type-caption`, label in `color-text-tertiary`, content in
  `color-text-primary`. One sentence, present tense.
- Portrait: required. `space-24` square (96px), `radius-full`, 1px border,
  beside the text from 640 and above, never as a background. The photo asset is
  still outstanding.

### 7.3 Section header

- One row: index (`type-caption`, tabular, accent) + label (`type-label`) +
  a 1px rule filling the remaining width.
- No underline decoration, no arrows, no icons.

### 7.4 Work row

- 1px top border per row, last row closes with a bottom border.
- Grid: 9rem meta column + flexible content from 640; stacked below.
- Meta: `year · role`, `type-caption`, `color-text-tertiary`, tabular.
- Title: `type-h3`; the whole row is one link. Hover and focus underline the
  title; the row itself does not move, tint, or lift.
- Summary: `type-body-sm`, `color-text-secondary`, ≤38em.
- Thumbnail, optional: 96–160px wide, 16:10, `radius-lg`, 1px border. Images
  sit left of the title on wide screens only when the list stays scannable.

### 7.5 Writing row

- Same grammar as the work row: 1px top border, 9rem date column, flexible
  content, stacked below 640.
- Date: `type-caption`, tabular, `color-text-tertiary`.
- Title: `type-h3`; the whole row links to `/writing/<slug>`.
- Summary: one sentence, `type-body-sm`, `color-text-secondary`, ≤38em.
- A `All writing` link closes the home list only when more than three posts
  exist.

### 7.6 Card (only when the image is the content)

- Whole-surface link. `color-surface`, 1px border, `radius-lg`.
- At rest: no shadow. Hover: the single approved lift (`scale(1.01)` +
  `shadow-floating`) at `duration-slow`; disabled under reduced motion.
- Title `type-h4`, meta `type-caption`, optional one-line summary `type-body-sm`.

### 7.7 Chips and status

- `type-caption`, 1px border, `radius-xs`, padding `space-1`/`space-2`.
- Pills are not used for status; per core, pills signal an explicit action.
- Status is conveyed by text, not by color alone.

### 7.8 Buttons and links

- Primary action: neutral ink fill (`color-primary` / `color-on-primary`),
  `radius-md`, height 40 (48 on touch-first surfaces), `type-label`.
- Secondary: transparent, 1px `color-border-strong`.
- Inline links: `color-primary-text`, underlined with a 2px offset; hover keeps
  the underline and moves to `color-primary-hover` for filled controls only.
- Never color-only affordances; every link is distinguishable without hue.

### 7.9 Footer

- 1px top border. Left: `© year`, `built YYYY-MM-DD`. Right: email and socials.
- `type-caption` / `type-label`, `color-text-tertiary`, hover to
  `color-text-primary`.
- No newsletter box, no oversized sign-off, no sitemap dump.

## 8. Motion and interaction

- Content does not animate in. No scroll-triggered reveals, no parallax, no
  page transitions in v1.
- Interaction feedback only: color/border at `duration-fast`; card lift at
  `duration-slow` with `easing-standard`.
- The theme is fixed, so there is no theme transition.
- `prefers-reduced-motion` removes movement; color feedback stays.
- Every hover affordance has a focus and touch equivalent.

## 9. Iconography and imagery

- Tabler outline, 24×24, stroke 2, `currentColor`, inline SVG. No icon font,
  no CDN, no second family.
- Decorative icons `aria-hidden`; icon-only controls carry `aria-label` and a
  44×44 target.
- Project imagery: real screenshots, 16:10, `radius-lg`, 1px border, meaningful
  `alt`. No stock photos, no device mockups with fake browser chrome, no
  gradient thumbnails.
- Portrait: one photo, neutral background, no filters.

## 10. Content model

The site is defined by these records; the pages are views over them.

```ts
type Localized = { en: string; zh: string };

type Profile = {
  name: string;
  role: Localized;            // "Frontend engineer & UI designer"
  org?: { name: string; href: string };
  location?: Localized;
  intro: Localized;           // ≤2 sentences, ≤34em at type-body-lg
  now: Localized;             // one present-tense sentence
  portrait?: { src: string; alt: Localized };
};

type Work = {
  slug: string;               // stable id, also the URL segment if a case page exists
  title: string;              // proper noun, never translated
  year?: number;              // omit rather than guess
  role: Localized;
  org?: string;
  summary: Localized;         // one sentence, outcome first
  href?: string;
  cover?: { src: string; alt: Localized };
  status: "live" | "archived";
};

type Writing = {
  slug: string;               // shared across locales
  locale: "en" | "zh";        // one file per locale; no silent fallback
  title: string;              // in the file's locale
  date: string;               // ISO 8601
  summary: string;            // one sentence, in the file's locale
  draft?: boolean;            // excluded from production builds
};

type Experience = {
  org: string;
  role: Localized;
  start: number;
  end: number | "now";
  href?: string;
  summary?: Localized;
};

type Social = { label: string; href: string };
```

Authoring rules:

- `title` and `org` are proper nouns and stay untranslated; everything else is
  `Localized`.
- A missing fact is omitted, never filled with a placeholder in production.
- Work is ordered newest first; `year` drives the visible meta.
- Writing is ordered newest first per locale. A post exists only in the locale
  it was written in; the other locale's list omits it rather than falling back.
- Summary voice follows DabAgents rule 07; this document does not set tone.

## 11. Astro implementation

- **Output:** fully static. No adapter unless a server island is introduced.
- **Pages:** `/` and `/zh` through the built-in i18n routing with
  `prefixDefaultLocale: false`; `/writing` and `/zh/writing`; one static page per
  post at `/writing/<slug>` and `/zh/writing/<slug>`.
- **Components:** `.astro` by default. No framework integration and no island
  exists today.
- **Islands budget:** zero. No client JavaScript ships; `dist/**/*.js` stays
  empty. Adding an island or an inline script needs a recorded decision first.
- **Content:** `src/content/works/*.md` with a Zod schema mirroring §10;
  `src/content/experience/*.md`; `src/content/writing/en/*.md` and
  `src/content/writing/zh/*.md`; profile and socials as typed TS modules.
- **Styling:** Tailwind CSS 4 through `@tailwindcss/vite`; tokens declared once
  in `src/styles/tokens.css` from upstream roles. No component-local hex.
- **Fonts:** DabFonts' `@font-face` block verbatim, self-hosted in
  `public/fonts`, regular weight preloaded, 600 left to `swap`. Astro's font
  pipeline is not used.
- **Images:** `astro:assets` with local sources; explicit dimensions to prevent
  layout shift.
- **SEO:** canonical + `hreflang` per locale, `Person` JSON-LD, sitemap,
  robots, and one build-time Open Graph image per locale.
- **Repo files:** this document, `README.md`, and `AGENTS.md` with the DabAgents /
  DabDesign / DabFonts pins.

## 12. Gates

- Blocking: `astro check`, `astro build`, and a clean console on every page.
- Blocking: contrast measured on the real surfaces in the pinned light theme;
  keyboard operation; 44×44 targets; no horizontal scroll at 320px or 200% zoom.
  Re-measure when dark returns.
- Blocking: every width named in DabDesign core §7 checked when layout changes.
- Reported, not blocking: Lighthouse performance and best-practice scores.

## 13. Non-goals

- No second accent hue, no gradient, no illustration system.
- No glass outside the site header (§7.1).
- No dark-pattern motion, no autoplay media, no cursor effects.
- No CMS, no database, no client-side router in v1.
- No page that exists only to host an animation.

## 14. Open items

These block content or assets, not the design:

1. **Portrait asset.** A photo file is still needed (square crop preferred). The
   hero slot is specified in §7.2.
2. **First post.** Writing renders only when at least one published post exists.
   Give me a title, date, and body, or accept that the section ships hidden.
3. **Work years.** The list meta expects a year per work. The current three
   projects have no recorded dates; omit or supply them.
4. **Dark mode.** Dormant by decision. Returning it needs an owner decision and
   a stated script budget, not a styling patch.

## 15. Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-11-19 | Accent is the approved personal-series blue; teal stays out | Owner |
| 2026-11-19 | A real portrait is required, beside the hero copy | Owner |
| 2026-11-19 | Writing ships in v1 as a dated list plus per-post pages | Owner |
| 2026-11-19 | Work is a list only; no case-study pages in v1 | Owner |
| 2026-11-19 | No system preference means light | Owner |
| 2026-11-19 | Shell is `container-lg`; no new container token | This document, §5 |
| 2026-11-19 | Header is sticky and the only surface allowed glass; project exception recorded | Owner |
| 2026-11-22 | The owner designed the shipped home directly; the thread 1.5 options (A and The Sheet) are archived, not adopted | Owner |

## 16. Visual direction

The owner designed the shipped composition directly. There is no pending
proposal and no separate approval step: this document describes the implemented
home, and the thread 1.5 exploration in `docs/design/direction.md` is archived
with neither option adopted.

- **Signature device:** the pinned portrait stage — the cutout portrait over the
  oversized `DabAZ` wordmark, with every later section scrolling over it.
- **Owner:** the owner owns composition, rhythm, and visual detail.
- **Authority:** the owner approves; HQ records the decision and holds the merge
  veto. A UI change still needs design sign-off (`AGENTS.md` → Definition of
  Done).
- **Current scope:** no new visual devices, effects, or layout variants until a
  later direction is approved. The header glass is the only approved exception.
- **Constraints:** the accent budget (§3), the single measure (§5), and the
  token-only rule (§7) still apply to every new section.
