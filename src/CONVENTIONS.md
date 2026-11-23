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
| `src/layouts/BaseLayout.astro` | document shell, head, skip link, slots, theme attribute | foundation |
| `src/components/` | shared primitives and the header/footer shell | foundation; extension by later threads |
| `src/lib/i18n.ts` | `Locale`, `Localized<T>`, `locales`, `defaultLocale`, `htmlLang()`, `localePath()`, `homePath()`, `workPath()`, `musicPath()`, `contactPath()`, `otherLocale()` | foundation; thread 4 |
| `src/lib/metadata.ts` | `PageMeta`, `ResolvedMeta`, `resolveMeta()` | foundation; thread 5 added OG, `hreflang`, and JSON-LD fields |
| `src/lib/structured-data.ts` | `homeJsonLd()`, `collectionJsonLd()`, `postJsonLd()` | thread 5 |
| `src/lib/dates.ts` | `formatDate(isoDay, locale)`, `dateTime()`, `rssDate()` | foundation; thread 4 |
| `src/lib/feed.ts` | `buildFeed(locale)` | thread 4 |
| `src/lib/writing.ts` | post URLs and ordering per locale, tags, pagination, alternate-language targets | thread 3; thread 4; thread 5 translation lookups |
| `src/lib/works.ts` | `sortWorks(entries)` | one works order for the home showcase and the `/work` grid: `order` first, then newest `year`; a record without `order` never overtakes a curated one |
| `src/data/site.ts` | site name, URL, email, `role` and `description` (`Localized`), and the surface identity: tagline, OG locale and image, icons, manifest, theme colours | foundation; thread 5 surface fields |
| `src/data/social.ts` | `Social[]`, `primary` and `all` | foundation |
| `src/data/music.ts` | `platforms`, `ownPlayer` (`note` is `Localized`), `releases` | thread 2 renders |
| `src/content/ui.ts` | every interface string the shell and shared components render | thread 4 |
| `src/content/` | content records and copy; collections land in `src/content.config.ts` | threads 2–4 |
| `src/pages/writing/` | `/writing`, `/writing/page/<n>`, `/writing/<slug>`, `/writing/tag/<tag>` | thread 3 |
| `src/pages/work.astro`, `music.astro`, `contact.astro` | `/work`, `/music`, `/contact`; the Chinese twins live under `src/pages/zh/` | maintenance |
| `src/pages/zh/` | the same routes under `/zh` | thread 4 |
| `src/components/writing/` | the post list, its row, tag links, the pager, the shared list/post/tag bodies | thread 3; thread 4 |
| `src/components/work/`, `music/`, `contact/` | each page's shared body, plus the pieces the home band reuses | maintenance |
| `src/pages/` | routes | threads 2–4 |
| `src/pages/sitemap.xml.ts` | every public route plus its `hreflang` alternates | thread 5 |
| `src/pages/404.astro` | the real 404 document, `noindex` | thread 5 |
| `scripts/check-tokens.mjs` | the token guard behind `pnpm lint` | foundation |
| `scripts/check-copy.mjs` | the Chinese punctuation and CJK–Latin spacing guard | thread 4 |
| `scripts/check-meta.mjs` | the post-build metadata guard (title pattern, OG, icons, sitemap, `hreflang`, no client JS) | thread 5 |
| `scripts/generate-icons.mjs` | the icon exports from the supplied plate master | thread 5 |
| `scripts/generate-og.mjs` | the two OG cards, rendered with the real Dab Sans faces | thread 5 |
| `scripts/subset-home-fonts.sh` | regenerates the home-only subset from the pinned faces | thread 5 |
| `scripts/home-glyphs.txt` | the exact character set the two home routes render | thread 5 |

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
the mapping in `DESIGN.md` §4. `tabular` adds tabular numerals. The site adds
three roles on top of that set: `type-display-xl` (the intro name), `type-lede`
(`type-h3` size at regular weight, for the intro paragraph), and
`type-label-caps` (uppercase kickers and tags). Home section titles use
`type-display`.

**Shape and motion.** Radius ladder `rounded-xs | sm | md | lg | pill` maps to
DabDesign's. One shadow (`shadow-floating`) and one lift (`scale(1.01)`,
`easing-standard`) exist; nothing else lifts. The duration ladder follows
Apple's site: `fast` 100ms for small controls, `base` 300ms for the standard
colour and state change, `slow` 400ms for media that moves, `slower` 500ms for
a reveal; `easing-standard` is Apple's `cubic-bezier(0.4, 0, 0.25, 1)`.
`prefers-reduced-motion` removes movement, not colour feedback.

## 3. Theme contract

- `<html data-theme="light" | "dark">`. Tokens flip on the attribute; components
  need no `dark:` classes.
- **The site is pinned to `light` for now.** `BaseLayout` writes
  `data-theme="light"` into the document and the toggle is not rendered. There
  is no theme script, so nothing reads the old `theme` storage key: a visitor
  who once chose dark gets light, and no client can change it.
- Light is also the fallback by construction: `:root` in `tokens.css` is the
  light theme, so a document with no attribute renders light too.
- `color-scheme: light dark` is declared in `<head>` and on `:root` even though
  the site renders light. Safari's Adaptive Dark Mode (27.3) repaints light
  pages that do not declare dark support, and `light dark` is the only
  declaration it honours while `light only` is unimplemented. Nothing on the
  page reads the UA's dark defaults — every colour is a token — so the
  declaration changes no pixel while the attribute stays `light`.
- The dark token block, the `@custom-variant dark`, and any
  `[data-theme="dark"]` styles stay in the tree. Restoring the toggle is a
  component restore plus an inline script, not a token change; the last commits
  that carry both are `71ac41f` and earlier
  (`git log -- src/components/ThemeToggle.astro`).
- A `dark:` Tailwind variant exists for the rare non-token case; do not use it
  to restate a role.

## 4. Fonts

The `@font-face` quartet and the `--font-sans` stack are DabFonts 1.0.1
`TYPESETTING.md` §2.1, copied verbatim into `tokens.css`: four faces, 400 and
600, `local("☺")` first in every `src`, `font-display: swap`.

- `BaseLayout` does not preload either 821 KB face: the home LCP image owns the
  critical bandwidth, and `font-display: swap` paints the fallback immediately.
- The two home routes use **Dab Sans Home**, a generated subset of the pinned
  faces: 400 and 600, about 25 KB each, containing exactly the characters those
  routes render (`scripts/home-glyphs.txt`). `body.home-font` switches the
  stack; every other route keeps the full faces. The subset is built by
  `scripts/subset-home-fonts.sh` (`pnpm subset`) from the pinned files and does
  not change the typeface or metrics. Re-run it whenever home copy changes.
  `vercel.json` serves the full faces immutable and the subset with a one-day
  cache plus `stale-while-revalidate`.
- `--font-mono` is Dab Mono plus system monospace and is used only for `code`,
  `pre`, `kbd`, `samp`, and tabular data. Never in the body stack.
- No italics, no synthesized weights, no Astro font pipeline, no CDN.
- `em` / `i` are reset to `font-style: normal` in `global.css`; the emphasis
  treatment (600 or colour) is still open, so nothing relies on a synthesized
  oblique.

**Chinese setting.** The document language is `en` or `zh-CN` (`htmlLang()`);
English runs inside a Chinese page carry `lang="en"`. Chinese copy uses Chinese
codepoints, one U+0020 after every sentence or closing mark that is followed by
text, and one U+0020 between Han and Latin letters or digits — DabFonts
`TYPESETTING.md` §3–§4. There is no `text-autospace`, no body
`letter-spacing`, and no `word-break` override. `type-label-caps` drops its
Latin 0.06em tracking on a `zh-CN` document (the token file owns the rule);
Han carries no uppercase. `scripts/check-copy.mjs` fails `pnpm lint` when a
Chinese string in `src/content/` or `src/data/` breaks the spacing rule.

## 5. Interfaces

| Component / module | Props / exports | Guarantees |
|---|---|---|
| `BaseLayout.astro` | `title`, `description`, `path?`, `locale?`, `alternatePath?`, `translationPath?`, `ogType?`, `jsonLd?`, `surface?` (`page` \| `secondary`); slots `head`, `header`, `footer`, default | charset/viewport, title/description/canonical, OG/Twitter, head-level `hreflang` + `x-default`, theme colours, icons/manifest, JSON-LD, `lang` from the locale, localized skip link and RSS title, the home subset switch, `data-theme` pinned to light, `#main`, header/footer fall back to the localized shell |
| `Container.astro` | `as?` (`div` default, `section`, `header`, `footer`, `main`, `nav`), `class?` | `container-lg` width and the 16/24/32 gutter |
| `Section.astro` | `as?` (`section` default), `spacing?` (`standard` \| `loose` \| `none`), `id?`, `labelledby?`, `class?` | top rhythm: `space-16`, `space-24` from 640 for `loose`, none for `none`; wraps its content in `Container` |
| `SectionHeader.astro` | `label`, `index?`, `id?`, `as?` (`h2` default), `class?` | index + label + 1px rule row; index is accent, decorative, tabular |
| `Prose.astro` | `class?`, `lang?` | `type-body` plus the 36em measure and paragraph rhythm; post bodies, heading/list/code/table rhythm from tokens only |
| `ContentImage.astro` | `src: ImageMetadata`, `alt`, `width`, `height`, `widths?`, `sizes?`, `loading?`, `class?` | `astro:assets` output, required dimensions and `alt`, 1px `radius-lg` frame |
| `.link`, `.button`, `.button-secondary` | classes | link: accent + underline, 2px offset; buttons: `type-label` typography in markup, 44px minimum, neutral ink or 1px boundary |
| `src/lib/i18n.ts` | `locales`, `Locale`, `defaultLocale`, `Localized<T>`, `htmlLang()`, `otherLocale()`, `localePath()`, `homePath()`, `workPath()`, `musicPath()`, `contactPath()` | one vocabulary for locale, BCP 47 tag, and path prefix |
| `src/lib/metadata.ts` | `PageMeta`, `ResolvedMeta`, `resolveMeta()` | title suffix (`DabAZ - <page>`, one hyphen and spaces in both locales), the home title (site name + tagline), absolute canonical from `site.url`, OG locale/image, `hreflang` set |
| `src/lib/structured-data.ts` | `homeJsonLd(locale)`, `collectionJsonLd(...)`, `postJsonLd(entry)` | `Person` + `WebSite` on home, `CollectionPage` on lists, `BlogPosting` on a post |
| `src/content/ui.ts` | `UiCopy` and default export | every interface string, both locales; components never inline one |
| `src/lib/dates.ts` | `formatDate(isoDay, locale)`, `dateTime()`, `rssDate()` | one date format per locale; Chinese uses `YYYY 年 M 月 D 日` |
| `src/lib/feed.ts` | `buildFeed(locale)` | one channel per locale: own posts, `<language>`, title, description, and self link |
| `components/home/HomePage.astro` | `locale: Locale` | the home composition in DESIGN.md §6 order; a locale's Writing band only when that locale has a post |
| `components/home/HeroPreload.astro` | — | the art-directed hero preload links for the `head` slot |
| `components/home/HeroStage.astro` | `locale?` | the cutout portrait over the inline wordmark SVG, art-directed across three widths, plus the scroll cue; one viewport tall, clipped, in flow — it scrolls away rather than pinning |
| `components/home/Intro.astro` | `locale: Locale` | the page's only `h1`: role (`type-h3`), name (`type-display-xl`, `lang="en"`), lede (`type-lede`) |
| `components/home/WorkSection.astro` | `entries: CollectionEntry<"works">[]`, `locale` | the home band: title, then the showcase in `components/work/WorkShowcase.astro` |
| `components/home/MusicSection.astro` | `locale?` | the home band; the streaming links, player, and release rows live in `components/music/MusicContent.astro` |
| `components/home/WritingSection.astro` | `entries: WritingEntry[]`, `hasMore: boolean`, `locale?` | the newest posts as home rows (`h3` titles, no tags), plus `All writing` only when more exist; the page renders the section only when a post exists |
| `components/work/WorkShowcase.astro` | `entries: CollectionEntry<"works">[]`, `locale` | pill-tab project gallery: one screenshot and one `summary` per record, cross-fading in one grid cell, with the medallion apple.com puts a play/pause in — a link to that project's case study (`/work/<slug>`, `/zh` alongside) named `ui.work.caseStudy`; the caption row is sized by the tallest summary so tabs never move; a tab list that overflows gets a 44px paddle per side that still has tabs beyond the edge; a press steps the selection by one project; the paddles are skipped in the tab order; the tab behaviour is the site's one client module (CONVENTIONS.md §6); nav hidden and panels stacked with scripting off |
| `components/work/WorkGallery.astro` | `entries: CollectionEntry<"works">[]`, `locale`, `heading?` (`h3` default) | two-up card grid; card = 16:9 screenshot in its own clipped box, `tags[locale]` (`type-label-caps`), title (`type-h3`); hover scales the image 1.03 |
| `components/work/WorkPage.astro` | `entries: CollectionEntry<"works">[]`, `locale` | `/work` body: `type-h1` heading plus the gallery |
| `components/music/MusicContent.astro` | `locale?`, `subHeading?` (`h3` default) | streaming links, DabMusic as own player, latest releases; kind labels and dates follow the locale |
| `components/music/MusicPage.astro` | `locale` | `/music` body: `type-h1` heading plus the content under an `h2` |
| `components/contact/ContactDetails.astro` | — | `site.email` and the contact subset of `social.all`, as a fragment |
| `components/contact/ContactPage.astro` | `locale` | `/contact` body: `type-h1` heading plus the details |
| `components/writing/PostList.astro` | `entries: WritingEntry[]`, `class?` | the dated rows; the last hairlines closes the list |
| `components/writing/PostRow.astro` | `entry: WritingEntry` | 9rem date column from 640, `type-h3` title link, one-line summary, tags; the row never nests links; title/summary/date use the post's locale |
| `components/writing/TagLinks.astro` | `tags: string[]`, `locale`, `class?` | `type-caption` chips under the locale's tag route; 44px targets on coarse pointers |
| `components/writing/PostFigure.astro` | `src: ImageMetadata`, `alt`, `caption?` | a post image at the prose measure, framed by `ContentImage`, with an optional caption |
| `components/writing/Pager.astro` | `current`, `total`, `locale`, `class?` | prev/next links only when those pages exist; `rel="prev"`/`rel="next"` |
| `components/writing/WritingListPage.astro` | `locale`, `page?` | the shared list body, empty state, and pager |
| `components/writing/PostArticle.astro` | `entry: WritingEntry` | the shared post body, prose map, meta, and back link |
| `components/writing/WritingTagPage.astro` | `label`, `locale`, `entries` | the shared tag page body |
| `src/lib/writing.ts` | `publishedPosts`, `postsForLocale`, `postSlug`, `postPath`, `writingPath`, `tagSlug`, `tagPath`, `tagPathFromSlug`, `collectTags`, `pageCount`, `pageSlice`, `pagePath`, `alternatePostPath`, `alternateTagPath`, `POSTS_PER_PAGE` | one route shape per locale; drafts leave production builds; a duplicate slug within one locale or a locale/directory mismatch fails the build; the same slug may exist once per locale |
| `src/pages/writing/` and `src/pages/zh/writing/` | `/writing`, `/writing/page/<n>`, `/writing/<slug>`, `/writing/tag/<tag>` under each prefix | static routes; 10 posts per page; each locale lists only its own posts |
| `src/content.config.ts` | `works`, `experience`, `writing` collections | Zod schemas mirroring DESIGN.md §10; `writing` adds `tags` and `draft` |
| `src/content/profile.ts` | `HomeCopy` and default export | home copy per locale: role, intro, `now`, about, portrait alt, section labels |

Rules: extend a primitive rather than forking it; a new visual need is a token
decision, not a local value. Home sections after the hero paint their own fill
on `::before` (`global.css`); no stacking layer is needed, because the hero
scrolls with the page.

## 6. Client JavaScript budget

Three artifacts, no more:

1. **The bootstrap.** `BaseLayout` writes `class="no-js"` on `<html>` and one
   inline `<script>` in `<head>` that replaces it with `js`. It runs before the
   body parses, so enhancement CSS never flashes. It is the only script every
   route carries.
2. **The showcase module.** `components/work/WorkShowcase.astro` ships one
   bundled module, loaded by `/` and `/zh` only. Astro inlines it into the
   document while it stays this small, so there is no `/_astro` request; the
   guard accepts either form. It adds the tab behaviour — selected state,
   roving `tabindex`, arrow/Home/End keys, the sliding indicator, and the
   paddles that step the selection on a narrow screen — to markup that
   already renders as a full list, and it works with scripting off.
3. **The header tone.** `BaseLayout` renders one inline script on `/` and `/zh`
   that sets `data-past` on `.site-header` once `scrollY` passes one screen.
   The bar transitions its scrim from the band tone to white over 500ms; alpha
   stays 0.82 at both ends. Other routes never get the attribute, so their bar
   keeps the band tone.

Everything else stays static. The showcase is a progressive enhancement: with
scripting off the nav is hidden and the four panels stack in document order with
their screenshots and summaries, so no project copy is reachable only through a
tab. `prefers-reduced-motion` drops the cross-fade and the indicator slide.

MDX is a build-time integration (`@astrojs/mdx`), not an island: a post body
may import `ContentImage` or another `.astro` component, and the output is still
plain HTML with no bundle of its own. Syntax highlighting is off so a code block
cannot import a palette outside the tokens.

Anything else — the toggle's return, audio, a command palette, analytics, an
interactive filter — needs a recorded decision and its own budget line before it
ships. Restoring the toggle adds one inline script, not a framework island.

JSON-LD is data, not client code: `type="application/ld+json"`, no `src`, never
evaluated. `scripts/check-meta.mjs` enforces the budget — the bootstrap's exact
text, the showcase module (inline or `/_astro`) on the home documents only, and
no unreferenced `.js` in `dist/`.

**Critical path.** `astro.config.mjs` sets `build.inlineStylesheets: "always"`:
the whole stylesheet is small, and inlining removes the render-blocking CSS
request that cost a cold mobile round trip. The two home routes render
`components/home/HeroPreload.astro` into the `head` slot, which preloads the
exact art-directed hero file for each breakpoint so the LCP image is discovered
before the parser reaches the body. The home routes switch to the 50 KB subset
(`body.home-font`), and the work and release covers are lazy with
`fetchpriority="low"`, so neither the full 1.6 MB font pair nor an offscreen
cover competes with the hero. No font is preloaded; `font-display: swap` paints
the fallback immediately. None of this changes the composition; all of it is a
performance decision.

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

- `src/content/` is the only home for records and copy. Foundation and thread 2
  created `src/content.config.ts` with `works` and `experience`; thread 3 added
  `writing` to the same file, never a second config.
- Works are ordered by the curated `order` first and newest `year` second, in
  one place: `sortWorks()` in `src/lib/works.ts`. The home showcase and the
  `/work` grid read the same order, so a record's position never disagrees
  between the two surfaces. Experience is still newest first by `start`, sorted
  at the page rather than in the loader.
- A work cover lives beside its record (`src/content/works/<slug>.<ext>`) so
  the `image()` schema helper resolves it; images are not kept in `public/`.
  `cover.dark` is the same screen captured in the dark theme and replaces
  `cover.src` when the document carries `data-theme="dark"`; a record without
  it (Cyclic, which ships dark only) keeps its one image in both themes.
- Writing lives at `src/content/writing/<locale>/<slug>.mdx`, one file per post
  per locale. Frontmatter: `title`, `locale`, `date` (`YYYY-MM-DD`; quote it, or
  the loader normalises the date YAML parses), `summary`, `tags`, `draft`. The
  directory must match `locale`; the same slug may exist once per locale and
  each locale lists only its own posts.
- A post body renders inside `Prose`. Markdown carries no classes, so headings
  and links are mapped to components once, in the shared `PostArticle`; an
  image is imported by the author and rendered through `ContentImage`.
- Writing tags are content strings written in the post's own language; the same
  post's `en` and `zh` files may use different tags. `tagSlug()` lowercases and
  hyphenates, CJK stays as written. Posts paginate at 10 per page.
- Work card tags are `Localized<string[]>` in the record, so each locale reads
  its own labels (`Product` / `产品`). They are not proper nouns.
- `src/data/site.ts` and `src/data/social.ts` hold identity constants only;
  `site.role` and `site.description` are copy, so they are `Localized`.
- Proper nouns stay untranslated; every other field is `Localized<T>`.

**Translation flow.** Interface copy lives in `src/content/ui.ts`; owner copy
lives in `src/content/profile.ts`, the collections, and `src/data/`. To add a
locale: extend `locales` in `src/lib/i18n.ts`; TypeScript then fails every
`Localized` record until the new locale is filled in — there is no silent
English fallback. Add the locale's route tree under `src/pages/<locale>/`.
Translate a post by adding a file in the new `writing/<locale>/` directory with
the same slug; until that file exists, that locale's list omits the post and
the language switch falls back to the list. Chinese copy must pass
`scripts/check-copy.mjs`.

- A missing fact is omitted, never replaced by a placeholder in production.
- Copy voice follows DabAgents rule 07; Chinese copy follows DabFonts.

## 9. Locale seam

Astro's built-in i18n runs with `defaultLocale: "en"`, `locales: ["en", "zh"]`,
and `prefixDefaultLocale: false` (`astro.config.mjs`): English is `/`, Chinese
is `/zh`. The route tree mirrors that (`src/pages/zh/…`); no middleware and no
client router are involved.

- `BaseLayout` takes `locale` and writes `<html lang="en">` or `lang="zh-CN"`.
  `htmlLang()` is the only mapper; do not write a locale tag by hand.
- Interface copy is `src/content/ui.ts`; a component reads
  `ui.<group>.<name>[locale]` and never inlines a string. Owner copy is
  `Localized` in `src/content/` and `src/data/`.
- `postPath()`, `writingPath()`, `tagPath()`, and `pagePath()` prepend `/zh`
  and no other module builds a writing URL. A post is listed only in the locale
  it was written in; there is no cross-locale fallback.
- The writing feed follows the same split: `/rss.xml` carries English posts,
  `/zh/rss.xml` carries Chinese posts. `rssPath(locale)` feeds the head
  autodiscovery link and the footer link; the channel's `<language>` is the
  document tag from `htmlLang()`.
- The language switch is a footer link. It points at the same page in the other
  locale when a translation exists (a post or a tag), and at that locale's
  writing list or home otherwise. `alternatePath` on `BaseLayout` is the only
  knob; pages pass it explicitly.
- The header's four items are real routes in every locale: `/work`, `/music`,
  `/writing`, and `/contact`. No nav item points at a home anchor; the home
  bands stay reachable by scrolling and keep their `id`s as deep links.
- The Writing band appears only when the current locale has a published post;
  the home band is reached through its `All writing` link.
- English runs inside a Chinese page carry `lang="en"` (site name, work and
  release titles, platform and social labels). Tags are author strings and are
  not auto-detected; translate them in the record if the post is Chinese.

## 10. Metadata and surface identity

Every page passes `title`, `description`, `path`, and `locale` to `BaseLayout`;
`resolveMeta()` appends the site name (Chinese uses `——`, English ` — `) and
builds the canonical URL. The home route is the exception in the head only:
`<title>` is `DabAZ — <tagline>`, while `<h1>`, `og:title`, and `twitter:title`
stay `DabAZ`. Every other route puts the page title first and closes with the
site name once.

- **Route fields.** `translationPath` is the equivalent page in the other
  locale, and only when a translation exists. The footer's `alternatePath` may
  fall back to a list or home; `hreflang` never does. Posts and tags pass the
  twin from `translationPostPath()` / `translationTagPath()`; home and the
  writing list pass their counterpart. `x-default` points at the English
  version when one exists.
- **Head surface.** Open Graph and Twitter use one description, one canonical
  URL, and one 1200×630 PNG per locale (`public/og/en.png`, `zh.png`). The
  default card titles the site name and uses `site.tagline`; `og:image:alt` is
  the page title. `og:type` is `article` on a post and `website` elsewhere.
  `twitter:card` is `summary_large_image`; there is no invented handle.
- **Structured data.** `src/lib/structured-data.ts` supplies `Person` and
  `WebSite` on the home route, `BlogPosting` on a post, and `CollectionPage`
  on a list or tag page. It is serialised once by `BaseLayout` as
  `application/ld+json` (data, not an island).
- **Icons and manifest.** `public/icon.svg` is the supplied plate master
  (`rx=108`, inside iOS's squircle). `scripts/generate-icons.mjs` exports
  `favicon.ico` (16/32/48), `apple-icon.png` (180), `icons/icon-192.png`,
  `icons/icon-512.png`, and `icons/icon-maskable-512.png` from it without
  re-rounding or recolouring. `public/site.webmanifest` lists 192/512 from the
  plate and a maskable 512.
- **Crawl files.** `src/pages/sitemap.xml.ts` emits every public route with the
  same alternates as the head; drafts never reach it. `public/robots.txt`
  points at the sitemap. `404.astro` is a real 404 and carries `noindex`.
- **Theme colour.** `<meta name="theme-color">` has a light and a dark entry;
  because the site is pinned to light, both use the active light background and
  mirror `--dab-color-background`. A meta tag cannot read a custom property, so
  `src/data/site.ts` carries the only colour literal outside `tokens.css` (see
  the exception in `AGENTS.md`).
- **Guard.** `scripts/check-meta.mjs` runs after the build inside `pnpm check`
  and fails on a broken title pattern, a missing or oversized description, a
  mismatched canonical/OG URL, a missing icon, a sitemap gap, a missing
  `x-default`, or an executable script.

## 11. Gates

| Command | Runs |
|---|---|
| `pnpm dev` | Astro dev server |
| `pnpm build` | static build to `dist/` |
| `pnpm preview` | serve `dist/` |
| `pnpm lint` | `scripts/check-tokens.mjs` + `scripts/check-copy.mjs` |
| `pnpm typecheck` | `astro sync && tsc --noEmit` |
| `pnpm check` | lint + typecheck + build; CI runs exactly this |

`@astrojs/check` is not a dependency (see the exception in `AGENTS.md`); the
build's compiler catches template errors.

## 12. Accessibility and layout invariants

- Skip link is the first focusable element; `#main` takes focus.
- Visible focus: 2px `color-focus` outline, 2px offset, never removed.
- Icon-only controls carry `aria-label` and a 44×44 target. No icon-only
  control ships today; add the label with the control, not after it.
- The accent appears in at most three places per screen: section index, inline
  links, current nav item. A fourth is a defect.
- Body copy holds the 36em measure; nothing else claims a second measure.
- No horizontal scroll at 320px or at 200% zoom; layouts are verified at 375,
  390, 640, 768, 1024, 1280, and 1536 whenever UI changes.
- Status is carried by text, not colour alone.

## 13. Measured contrast

Measured 2026-11-19 and re-measured 2026-11-22 after the two-tone override, with
the WCAG 2.2 formula on the token values above, not on estimates. Text pairs
need 4.5:1, non-text 3:1. `text-secondary` and `text-tertiary` are one tone in
this project (AGENTS.md § Exceptions), so their rows match.

| Pair | Light | Dark | Minimum |
|---|---:|---:|---|
| `text-primary` on `background` | 17.18:1 | 18.97:1 | 4.5:1 |
| `text-primary` on `surface` | 17.93:1 | 17.18:1 | 4.5:1 |
| `text-secondary` on `background` | 4.81:1 | 7.85:1 | 4.5:1 |
| `text-secondary` on `surface` | 5.02:1 | 7.11:1 | 4.5:1 |
| `text-tertiary` on `background` | 4.81:1 | 7.85:1 | 4.5:1 |
| `text-tertiary` on `surface` | 5.02:1 | 7.11:1 | 4.5:1 |
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

## 14. Launch surface

Home sections are built (thread 2): hero, work, earlier, and about, with contact
links in the hero and the footer. Thread 3 built writing: the home Writing band
(newest three), `/writing`, one page per post, tag pages, pagination, and a
populated `/rss.xml`. Thread 4 built the locale seam: `/zh` for home and every
writing route, `/zh/rss.xml`, interface-copy extraction, the footer language
switch, and the Chinese spacing guard. Thread 5 built the launch surface:
head-level `hreflang` and `x-default`, the per-locale OG cards, the icon
exports and manifest, the `Person`/`BlogPosting`/`CollectionPage` JSON-LD, the
sitemap, robots, the real 404, the post-build metadata guard, and the home-only
font subset (50 KB instead of 1.6 MB on `/` and `/zh`). Maintenance promoted the
header nav to its own routes — `/work`, `/music`, and `/contact` in both
locales — with the home bands reusing the same bodies.

Open content items, all owner-supplied: a final portrait to replace the CV photo,
real 16:9 work covers, and a design pass on the writing surfaces, which reuse
the existing tokens and primitives but have not had thread 1.5 sign-off. Works
and roles show years by owner decision; the CV's month ranges are not modelled.
The home and post descriptions are owner copy and sit below rule 07's length
floor; `scripts/check-meta.mjs` reports them as warnings rather than padding
them.

The home work band now renders `components/work/WorkShowcase.astro` — the
pill-tab project gallery, and the reason the JavaScript budget exists — while
`/work` keeps the two-up grid. It reuses the records' existing covers and
`summary` copy; no new content field was added.
