# Visual direction — dabaz.me home

**Thread:** 1.5, Design Direction.
**For:** archive.
**Date:** 2026-11-19.
**Scope:** header, hero, work, earlier, about, footer on `/`. Nothing else.
**Status:** archived exploration. Neither option was adopted. The owner designed
the shipped composition directly; see `DESIGN.md` §16.

> **Archived.** This document records the A/B exploration, not the shipped
> direction. Do not implement from it.

---

## 0. How to read this

| Artifact | Path |
|---|---|
| Comps (standalone HTML, no JS) | `docs/design/comps/{before,a,b}.html` + `comps.css` |
| Decision record | this file |

The screenshots, capture scripts and source images used during the exploration
were removed when it was archived; the comps remain as the visual evidence. View them with `python3 -m http.server 4321` at the repo root. They
link the **real** `src/styles/tokens.css`, so every colour, type role, space
step, radius and duration on screen is the token, not a copy. Nothing under
`docs/design/` ships.

Measured during the comp pass: no horizontal scroll at 320 / 375 / 768 / 1024 /
1440 in either direction (`scrollWidth === clientWidth` at every width);
full-page captures were 1× CSS pixels (hover and focus clips 2×); page height
1.66–1.93k at 1024.

## 1. What I held

- **Tokens only.** No new hue, no second type scale, no tracking, no new token
  value. The only new declarations are the three header-glass tokens DESIGN.md
  §7.1 already requires. B introduces no new composition value; A's 20rem
  identity column is its one new value and one of the reasons it needs a §5
  amendment.
- **Accent budget.** Both directions use the accent in **two** places on this
  page: the section index, and inline links in the hero. The nav item is the
  reserved third and does not exist yet. Footer links and work titles stay
  neutral, so the count is visible in a screenshot.
- **Glass** stays in the header; every other surface is opaque.
- **No client JavaScript.** Comps carry no script; the only behaviour is CSS.
- **Shell** stays `container-lg` with 32 gutters. The outer air is composed, not
  filled by widening.
- **Photo and covers** are the real files already in the repo. No direction
  depends on the outstanding final portrait.

## 2. The problem, as I read it

The page is compliant and flat for three reasons:

1. **One scale.** The section opener is 14px/600, the same role as nav and
   links. Nothing on the page is larger than the work titles except the name, so
   sections do not read as sections.
2. **One rhythm.** Every row has the same padding, the same border weight, and
   the same left start, so Work, Earlier and About are three identical stripes.
3. **Uncomposed air.** The 960 column is centred inside 1440 with nothing in the
   outer 240px on each side; the emptiness reads as an unfinished default, not
   as a margin.

DESIGN.md §4 already maps **section titles to `type-h2`**; §7.3 asks for a
`type-label` label. The build followed §7.3, which is where the missing scale
contrast comes from. That conflict is §9, item 1.

## 3. D1 — the two directions

### Direction A — “The Column”

**Signature device.** *The page is a spread: the person holds the left column,
the record runs in the right one.* At 1024 and above, identity (portrait, name,
role, `now`, links) is a 20rem column that sticks below the header while the
record scrolls beside it; the footer closes the same split.

**Composition per section.** Hero: the left column is the whole identity, the
introduction opens the right column; name and intro sit on one top line.
Work/Earlier: two columns inside the 608px record — 9rem meta, then title and
summary; no covers, the portrait is the page's only image. About: prose at the
record's edge. Header/Footer: full width, with the footer repeating the 20rem +
1fr split so the composition has a bottom edge.

**Rhythm.** Dense at the top left, continuous down the right; 96 from the hero
to Work, 64 between sections, 24 inside a row. At 375/768 the spread collapses
into one column, which is today's hero.

**Detail language.** Name ↔ intro aligned on one line. Section opener keeps the
existing inline shape (index, h2 title, rule) but with an h2 title, so the rule
after the word is short and the title is the loudest thing in the band. Row
hover/focus underlines the title only. Sticky identity at 96 from the top; no
shadow, no blur beyond the header.

**Intent, one sentence per section.**
Header — the name and the theme control are the only fixed things; everything
else may pass beneath.
Hero — you meet the person first, and what he does is stated beside him, not
below him.
Work — the record is a list of titles, read at a comfortable measure rather than
as a gallery.
Earlier — the same grammar continues without images, so the current job is not
dramatised.
About — the page ends in the first person, on the record's axis.
Footer — the split closes the page: the year on the left, the ways to reach him
on the right.

**Cost.** A DOM change: `main` becomes two columns (identity / record), the intro
moves out of the hero element, and the header/footer keep their own width. The
sticky column is a second sticky surface on a page that has one.

**Risk.** The device exists only from 1024. Below that, A is today's page with
better titles. On mobile the intro can no longer follow the role — it arrives
after the contact links (`a-768-light.png`), which reads as a section
introduction, not as the hero statement. And the sticky column is a
behaviour DESIGN.md does not currently allow (§8 lists no scroll behaviour; §7.1
makes the header the only sticky element).

### Direction B — “The Sheet”

**Signature device.** *The page is one ruled sheet: every section boundary is a
hairline that runs to both screen edges, the section number rides that line, and
each band answers at both margins — date on the left, the work's mark on the
right.*

**Composition per section.** Header: sticky 64px glass band, one hairline.
Hero: inside the band, the name claims the left edge and the role answers from
the right edge on the same baseline, with the portrait under the role; the
intro, `now` and links stay in a 34em statement column at the left. Work: the
full-bleed rule with `01` sitting on it, the title at the text axis (9rem +
24px), rows of date·role in the margin, title and one-sentence summary in the
column, 128×80 cover at the right edge. Earlier: the same grammar, no cover.
About: a short paragraph on the same text axis, so the section is a statement in
the record, not a footnote. Footer: the last rule, year and build date left,
links right.

**Rhythm.** 96 from the hero to Work, then alternating 64 of air and a rule;
24 inside a row. The 1440 page reads top to bottom as bands, not as one column
of grey text. At 375 the same bands stack: the rule still reaches both edges,
the number still sits on it, covers drop out.

**Detail language.** Section index 12px accent on the rule, optically raised
0.25em, with 12px of page background cutting the line behind it; h2 titles at
24/600; row hover and keyboard focus underline the title and darken that row's
own top rule to `border-strong` in 100ms — the line steps forward, the row does
not move. Focus stays the standard 2px ring. Header: 82% scrim + `blur(16px)
saturate(1.8)`, opaque fallback, opaque under reduced transparency.

**Intent, one sentence per section.**
Header — a 64px glass shelf holds the name and the theme so content can pass
under it without ever competing.
Hero — within two rules, the name takes the left edge and the role answers from
the right: you know whose page this is before you scroll.
Work — four years of shipped things read as a ruled ledger: date in the margin,
the thing in the column, its mark at the far edge.
Earlier — the same ledger without marks, so the record keeps one pace and no
role is dramatised.
About — a short paragraph on the same axis closes the record in the first
person.
Footer — one last rule, the year and build date at the left, the ways to reach
him at the right: an end rather than a sign-off.

**Cost.** Section boundaries move from `Container` to the section band (`Section`
gains a rule on its outer element); `SectionHeader` gains a stacked variant; the
work rows gain a third track for the cover at 768 and up and lose it below.

**Risk.** The margin column is empty on About (intentional, and the only place
it is); the covers are light logo plates today and will glare in dark theme
until real 16:10 screenshots land (§9, item 3); below 768 the cover is not shown,
which needs HQ's agreement (§9, item 2).

### Recommendation

**Direction B.** A's idea is stronger on a 1440 screenshot and weaker everywhere
it has to survive:

1. **A's device does not exist below 1024.** The handoff asks a signature to
   work at 375 and 1440; A's split, its sticky column and its tone all collapse
   at the width most people will read it at. B's rule-and-margin grammar is the
   same idea at 375 as at 1440.
2. **A breaks the hero's reading order on mobile** — the intro is stranded after
   the contact links because it has to live in the record column — unless the
   copy is duplicated in the DOM or the split is abandoned.
3. **A removes the only project imagery** from a portfolio, and puts its whole
   bet on a portrait that is still a CV photo (DESIGN.md §14.1). B uses the
   covers as evidence at the right edge and simply omits them where they would
   cost the text too much.
4. **A needs more contract to change**: a sticky content column (§8), a split
   shell (§5), and a 20rem composition value (§5). B needs one amendment — the
   section title role (§7.3 vs §4) — plus the cover placement already covered by
   “optional” in §7.4.

B also keeps the accent bill at two, uses no new raw value (its text axis is
`9rem + space-6`), and is the smaller diff to thread 2's existing components.

## 4. D2 — comps and screenshots

| Comp | What it shows |
|---|---|
| `comps/before.html` | today's build with the same content, for comparison |
| `comps/a.html` | Direction A |
| `comps/b.html` | Direction B |

Each was captured at 375, 768, 1024 and 1440 in light and dark
(`shots/<comp>-<w>-<theme>.png`), plus a scrolled viewport at 1440
(`-scrolled-`) and a clipped hover and keyboard focus state at 1024 (`-hover`,
`-focus`). All six sections appeared in every full-page capture. Comp heights:
375 → 2.2–2.3k, 1024 → 1.7–1.9k. The capture set was removed from the repo when
the exploration was archived; the filenames below are historical.

## 5. D3 — detail spec (Direction B)

All values are existing tokens. “9rem” is the meta column DESIGN.md §7.4 already
fixes; “9rem + space-6” is its text axis.

### 5.1 Header

| Property | Value |
|---|---|
| Position, height | `sticky`, `space-16` (64), z above content |
| Surface | `--dab-header-bg` 82% + `backdrop-filter: var(--dab-header-blur)`; fallback and `prefers-reduced-transparency` → `color-background`, no blur |
| Border | 1px `color-border` (`--dab-header-border`) |
| Wordmark | `type-h4` 600, `color-text-primary`, no underline; 44px target via padding |
| Toggle | 24px icon in 44×44, `color-text-secondary` → `color-text-primary` on hover, `aria-label` |
| Nav (when routes land) | `type-label`, `color-text-secondary`; current item `color-text-primary` + accent marker — the third accent place |
| Anchored sections | `scroll-margin-top: calc(space-16 + space-4)` |

### 5.2 Hero

| Property | 375 / <640 | ≥640 | ≥1024 |
|---|---|---|---|
| Padding | `space-16` top, `space-24` bottom | same | `space-24` / `space-24` |
| Layout | one column, portrait first | text + portrait 96 at the right | grid: name left, role right, portrait right, statement left |
| Name | `type-display`, `color-text-primary` | same | on the left edge; role baseline-aligned at the right edge |
| Role | `type-h4`, `space-3` under the name | same | `type-h4`, right-aligned, shares the name's baseline |
| Intro | `type-body-lg`, `color-text-secondary`, ≤34em, `space-4` after role | same | `space-6` after the name row |
| Now | `type-caption`; label `color-text-tertiary`, content `color-text-primary`; `space-6` | same | same |
| Links | `type-label`, wrap, `space-2`×`space-6`, `space-6` above | same | same; inline links are the second accent place |
| Portrait | `space-24` square, `radius-full`, 1px `color-border` | right edge | right edge, `space-6` under the role |

### 5.3 Section opener (the device)

| Property | Value |
|---|---|
| Band | The section element carries 1px `color-border` `border-block-start`, full viewport width |
| Index | `type-caption` `tabular`, `color-primary-text`, on the rule, raised `0.25em`, `space-3` of page background to its right cutting the rule |
| Title | `type-h2` 600 `color-text-primary`, `space-8` below the rule, at the text axis from 768 |
| Rule after the label | removed; the band's own border is the rule |
| Section bottom | `space-16` (64) — the next band's rule lands 64 below the last row |

### 5.4 Rows (work, earlier)

| Property | 375 / <640 | 640–767 | ≥768 |
|---|---|---|---|
| Grid | one column, meta above title | `9rem | 1fr` | `9rem | 1fr | 128px` |
| Row rule | 1px `color-border` top; last row closes with a bottom | same | same; rules span the container, not the viewport |
| Padding | `space-6` block | same | same |
| Meta | `type-caption` `tabular` `color-text-tertiary` | same, `space-1` down | same |
| Work title | `type-h3` `color-text-primary` | same | same |
| Summary | `type-body-sm` `color-text-secondary`, ≤38em, `space-1` under title | same | same |
| Cover | not shown | not shown | 128×80, 16:10, `radius-lg`, 1px border, right-aligned to the container edge |
| Earlier org | `type-label` under the title | same | same |
| Whole row | one link; no lift, no tint, no thumbnail inside the text |

### 5.5 About and footer

| Property | Value |
|---|---|
| About | `type-body`, `color-text-secondary`, 36em; `space-8` under the title; at the text axis from 768 |
| Footer | 1px `color-border` top, full width; `type-caption` `tabular`; `color-text-tertiary` → `color-text-primary` on hover; `space-8` block padding; © + built left, links right |

### 5.6 States

| State | Rule |
|---|---|
| Row hover | title underlined (1px, 2px offset); that row's top rule → `color-border-strong`; `duration-fast`, `easing-linear`; no transform |
| Row focus-visible | same as hover plus the standard 2px `color-focus` ring; the whole row is the target |
| Link hover | underline stays, colour moves to `color-primary-hover` only for filled controls; inline links keep `color-primary-text` |
| Header while scrolled | scrim only; no shrink, no shadow, no colour change |
| Reduced motion | no transition to remove; colour feedback remains |
| Reduced transparency | header opaque |
| Dark theme | identical structure; cover frames stay `color-border`; header text measured on the composite (81–82% keeps tertiary 4.86:1 in the worst case) |

### 5.7 Where A differs

A's header, footer type, row type and states are the same. It differs in: hero
as two columns from 1024 (20rem identity + 608 record, sticky identity, intro at
the top of the record); section opener inline with an h2 title and a short rule;
rows two columns, no covers; About and Work in the record column; footer split
20rem + 1fr.

## 6. D4 — implementation notes for thread 2

Nothing here forks a primitive; two primitives grow a prop.

| File | Change |
|---|---|
| `src/styles/tokens.css` | Foundation adds `--dab-header-bg` (`rgb(250 250 250 / .82)` / `rgb(10 10 10 / .82)`), `--dab-header-blur` (`blur(16px) saturate(1.8)`), `--dab-header-border` (`var(--dab-color-border)`). No other token. |
| `SiteHeader.astro` | `position: sticky`, `inset-block-start: 0`, `z-index`, `backdrop-filter` + `-webkit-` prefix, `@supports not (backdrop-filter: blur(1px))` and `prefers-reduced-transparency` fall back to `color-background`. Keep the 64 height, one border, `Container` inside. |
| `Section.astro` | New prop `divided?: boolean`: puts the 1px top border on the section element (the band) and `space-16` bottom padding, keeps `Container` inside. Existing `spacing` unchanged; the hero keeps `loose`. |
| `SectionHeader.astro` | New prop `layout?: "inline" | "stacked"` (default `inline` = today). `stacked`: index on the rule in a zero-height first grid row, `type-h2` title at the text axis. Title role changes from `type-label` to `type-h2` (see §9). Keep `aria-hidden` on the index. |
| `home/Hero.astro` | From 1024: `.hero__inner` becomes a two-column grid (1fr / auto); `.hero__text` becomes `display: contents` so name, role, intro, now, links take their own areas; role `align-self: baseline`, right-aligned. No markup change, and `display: contents` must stay on the div, never on the `h1`. |
| `home/WorkList.astro` | Row grid gains `auto` for the cover at ≥768; cover `grid-column: 3`, `justify-self: end`; `display: none` below 768. Row hover/focus: `.row:hover, .row:focus-within { border-block-start-color: color-border-strong }` (no `:has` needed). |
| `home/ExperienceList.astro` | Same row grammar, no cover; nothing else. |
| `pages/index.astro` | `Section` gets `divided`; `SectionHeader` gets `layout="stacked"`; the About paragraph gets the text-axis margin. Structure unchanged. |
| `src/CONVENTIONS.md` | Add `divided` and `layout` to the `Section` / `SectionHeader` rows once merged. |

Do not: add a shadow, move the portrait, change the type scale, add a wrapper
div per row, or widen the shell.

## 7. D5 — design QA checklist (sign-off artifact)

1. Header at rest: 64px tall, one hairline, wordmark and toggle share the
   content edge. Compare with `b-1440-light.png` top band.
2. Header scrolled: content visibly passes under a legible scrim, no shadow or
   height change; the wordmark is not chased by text behind it
   (`b-1440-scrolled-light.png`).
3. Section boundaries: one 1px rule per boundary, edge to edge at 1024/1440, no
   doubled 2px line between two sections; row rules stay inside the container.
4. Section opener: the index sits on the rule, no line crosses the numerals, the
   h2 title shares its left edge with the first work title and the About prose
   at ≥768.
5. Rows: hover and keyboard focus underline the title and darken that row's own
   rule, at identical geometry; nothing moves, lifts, or tints
   (`b-1024-hover.png`).
6. Accent count in one screenshot: section indices + hero inline links only
   (two); footer links and titles neutral.
7. Keyboard path: skip link → wordmark → toggle → hero links → every row; a
   2px ring at 2px offset on each, including rows (`b-1024-focus.png`).
8. 320px and 200% zoom: no horizontal scroll, no clipped rule, no wrapped meta
   colliding with the title.
9. Dark theme: repeat 1–8; header text sits on the composite, cover frames do
   not become the brightest thing on the page.
10. 375 and 768: the rule still reaches both edges, the index still rides it,
    covers absent below 768, and the hero order is portrait → name → role →
    intro → now → links.

## 8. Contract edits Direction B would have implied

None of these were adopted; this section records what the proposal would have
changed. HQ would have recorded them in DESIGN.md; this archive does not edit it.

1. **§7.3 vs §4 — section titles.** Adopt §4's mapping: the section title is
   `type-h2`, the index is a `type-caption` marker. §7.3's `type-label` label and
   trailing rule are replaced by the stacked opener. This is the single largest
   reason the page currently has no scale contrast.
2. **§7.4 — cover placement.** From 768 the optional cover sits at the row's
   right edge at 128×80; below 768 it is not rendered. “Optional” already
   permits both; the direction fixes the position.
3. **§5 — one left edge.** The section index and row meta keep the container
   edge; titles and prose take the 9rem + `space-6` text axis from 768. The
   header, the margin column and the footer still share one edge.
4. **§7.1 — header.** Scrim at 82% (above the 80% floor), blur unchanged,
   opaque fallback; measured on the composite, not on the token.
5. If A had been chosen instead: §5 (split shell with a 20rem column), §7.2 (hero
   composition), §8 (sticky content column), §7.4 (no covers).

## 9. Ambiguities and defects found

1. **DESIGN.md §4 vs §7.3** contradict each other on the section title role.
   The build followed §7.3. Resolve with §8.1.
2. **§7.4 says the cover sits “left of the title”**; Direction B puts it at the
   right edge because the left is already the meta column. If HQ keeps the left
   position, B still works — the cover would sit between meta and title — but the
   row loses its right-edge answer and half of its rhythm.
3. **Cover alt text is wrong for three works.** `cyclic.webp`, `dabmusic.webp`
   and `dabsudoku.webp` are light grey plates; their alt text says “dark violet”
   or “dark” background. Content defect, not design: fix in `src/content/works/`.
   They are also logo plates, not 16:10 screenshots, and they glare in dark
   theme at 128px. Real covers are a prerequisite for B's Work section to look
   finished; until then the placement is honest but the assets are not.
4. **The portrait is still the CV photo** (§14.1). Both directions keep it at
   `space-24`, so neither depends on the final asset; a bigger portrait would.
5. **The `02` Writing slot is absent.** No placeholder was drawn; the rule
   system in B absorbs it without renumbering.
6. **The header has no nav items** until routes exist. The comps show the seam
   only; the current-item accent marker is the reserved third accent place and
   must not be used anywhere else.
7. **Section spacing on the first section** is 96 (hero → first) and 64 between
   sections in B, per §5. The current build gives 64/64, which is part of why
   the page reads as one continuous strip.

## 10. Not done

No production page, no edits to `tokens.css`, `DESIGN.md`, `AGENTS.md` or
`src/CONVENTIONS.md`, no blog, `/zh`, OG art or deployment. The comps and the
capture set were reviewed during the exploration; the owner chose neither and
designed the shipped composition directly. The captures were removed from the
repo afterwards.
