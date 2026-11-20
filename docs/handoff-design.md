# Handoff — Design Direction (thread 1.5)

**From:** HQ (thread 0).
**To:** Design Direction.
**Date:** 2026-11-19.
**Status:** transient working document. Delete after the direction is approved and
implemented.

---

## 1. Why this thread exists

The home page is contract-compliant and visually generic. That is a process
defect, not a failure by thread 2: no thread owned composition.

Evidence from the current build:

- every element carries exactly one type role and one spacing step, so nothing
  has scale contrast;
- the three work rows are identical in rhythm, thumbnail size, and weight;
- the accent appears only on the section index and links, so the page reads as
  gray text on gray;
- a 960px shell with small type leaves large empty areas that nothing anchors;
- the reference sites were translated into prohibitions (no glass, 1px, three
  accents) and lost the qualities that made them feel designed.

Your job is to supply what the rulebook cannot: composition, rhythm, hierarchy,
and one memorable idea.

## 2. Position and authority

| Layer | Owner |
|---|---|
| Tokens, fonts, primitives | Foundation (done) |
| **Visual direction, composition, detail** | **you** |
| Implementation into sections | thread 2 |
| Approval, veto, merge | HQ |

- You propose; **HQ approves one direction**; thread 2 implements it.
- You do not write production page code. You may build comps on a throwaway
  branch.
- HQ records the approved direction in `DESIGN.md`; you do not edit it.
- No UI change merges without your sign-off on the implemented result.

## 3. Read order

1. [`DESIGN.md`](../DESIGN.md) — the contract. Note §2 (references and measured
   facts), §3 (color and the accent budget), §5 (layout), §6 (structure), §7
   (component rules), §7.1 (header glass), §13 (non-goals), §16 (this thread).
2. [`AGENTS.md`](../AGENTS.md) — stack, gates, design sign-off, exceptions.
3. [`src/CONVENTIONS.md`](../src/CONVENTIONS.md) — the shared interface.
4. Upstream at the pins in `AGENTS.md`: DabDesign `core.md` §3.3–§7, `DabDesign.md`,
   DabFonts `GUIDELINE.md` + `TYPESETTING.md`.

## 4. Mandate

Deliver a visual direction that makes the existing structure feel designed
without changing the content, the tokens' hue, or the accent budget.

Propose **two directions**, each with:

1. **One signature device** — the single thing a visitor remembers.
2. **Composition per section** — hero, work, earlier, about, header, footer:
   alignment, scale relationships, image sizes, where whitespace gathers.
3. **Rhythm** — how density changes down the page and across 375 → 1440.
4. **Detail language** — hover, focus, underlines, transitions, image treatment,
   the sticky header's behavior.
5. **A one-sentence intent per section** — what the visitor should feel or
   understand there.

Then recommend one and say why the other loses.

## 5. Constraints

- **Tokens only.** No new hue, no second type scale, no tracking, no raw values
  in components. The only new tokens permitted are the header glass values that
  `DESIGN.md` §7.1 already requires (`--dab-header-bg`, `--dab-header-blur`,
  `--dab-header-border`); propose them, HQ approves, thread 2 adds them.
- **Accent budget stays three places.** If a direction needs a fourth, it is the
  wrong direction.
- **Glass stays in the header.** No glass on cards, dialogs, footer, or images.
- **No client JavaScript.** No scroll effects, parallax, cursor followers, or
  page transitions.
- **Accessibility is not negotiable.** Contrast, focus, 44×44 targets, and
  reduced motion survive every direction.
- **The references are prior art, not templates.** Take principles (scale
  contrast, row grammar, card anatomy), not looks. Do not paste a reference's
  colors, type sizes, or radii.
- **Width stays the shell in `DESIGN.md` §5.** Do not widen the container to
  "fix" emptiness.

## 6. Deliverables

**D1 — Direction memo.** Two options, one recommendation, each ≤1 page. Include
the signature device, what it costs in complexity, and the risk.

**D2 — Comps.** Header, hero, work, earlier, about, footer at **375, 768, 1024,
1440**, light and dark. Comps live on a throwaway branch: either a temporary
Astro route deleted before merge, or standalone HTML under `docs/design/`.
Commit screenshots to `docs/design/`; the code does not merge. If you cannot
capture pixels, say so instead of claiming a visual check.

**D3 — Detail spec.** A short table per section: spacing steps, type roles,
image sizes, hover/focus states, and the sticky header behavior (scrim, blur,
fallback, anchor offset). Written against existing tokens.

**D4 — Implementation notes for thread 2.** Which primitives to extend and
which props to add; which files change; what must not be forked. No new
components unless a comp proves one is needed.

**D5 — Design QA checklist.** Ten checks maximum, each observable in a
screenshot or a keyboard pass. This becomes the sign-off artifact.

## 7. The signature device

One only. It must:

- be describable in one sentence;
- work at 375 and at 1440, not just the middle;
- survive with the accent removed;
- need no JavaScript;
- carry meaning rather than fill space.

Examples of the *kind* of decision (not prescriptions): an oversized name that
sets the page's scale; a numbered index rail that runs down the margin; covers
at full row width; editorial captions under work; an intentionally asymmetric
hero. Pick one and build the rest around it.

## 8. Header glass — binding spec

Already decided; design it, don't relitigate it:

- sticky, `space-16` tall, 1px bottom border, content scrolls underneath;
- scrim at **80% minimum** of the page background, `blur(16px) saturate(1.8)`;
- opaque fallback when `backdrop-filter` is unsupported or the user prefers
  reduced transparency;
- contrast measured over the composited scrim in both themes;
- anchors offset by header height + `space-4`;
- the only glass surface on the site.

## 9. What you must not do

- Do not change copy, the content model, or add pages.
- Do not add dependencies, frameworks, or fonts.
- Do not touch the blog, `/zh`, OG art, or deployment.
- Do not merge the comp branch; HQ merges the approved direction through thread
  2's implementation PR.
- Do not edit `DESIGN.md`, `AGENTS.md`, or `src/CONVENTIONS.md`.

## 10. Current implementation you are designing over

```
src/layouts/BaseLayout.astro
src/components/  Container, Section, SectionHeader, Prose, ContentImage,
                 SiteHeader, SiteFooter, ThemeToggle
src/components/home/  Hero, WorkList, ExperienceList
src/styles/  tokens.css, global.css
src/content/  profile.ts, works/*.md, experience/*.md
```

Everything is a composition of existing tokens; the shared interface is listed
in `src/CONVENTIONS.md`. Extend it; do not fork it.

## 11. Review and acceptance

HQ accepts a direction when:

1. D1 names one signature device and the two options differ in *idea*, not in
   spacing values.
2. D2 shows all six sections at all four widths, both themes.
3. D3 is expressed only in existing tokens (plus the header glass tokens).
4. D5 checks are observable and include the header at rest and scrolled.
5. Nothing in the direction breaks §3 of `DESIGN.md`.

Then HQ records it in `DESIGN.md` §16, and thread 2 implements.

## 12. Reporting back

Reply with: the two directions and the recommendation; links to the comps and
screenshots; the token additions you need; the D4 implementation notes; the D5
checklist; and any place where `DESIGN.md` was ambiguous.

Do not open a production PR for comps. HQ decides what merges.
