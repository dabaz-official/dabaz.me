# dabaz.me

Personal site of DabAZ: work, writing, and contact. Static HTML, self-hosted
fonts, no client runtime.

The rebuild is in progress on `rebuild`. This branch ships the foundation —
tokens, fonts, the document shell, shared primitives, CI — the home page (hero,
work, music, blog, contact), the blog (`/writing`, post pages, tags, pagination,
per-locale RSS), and the Chinese site: `/zh` with the same routes, a footer
language switch, and DabFonts punctuation and CJK–Latin spacing.

## Stack

- **Framework:** Astro 7.4.12, fully static, no adapter; MDX for post bodies
  (`@astrojs/mdx`, build-time only)
- **Language:** TypeScript, `strict: true`
- **Styling:** Tailwind CSS 4.3.5 (`@tailwindcss/vite`) over DabDesign tokens in
  `src/styles/tokens.css`
- **Fonts:** DabFonts 1.0.1, self-hosted (`public/fonts`)
- **Deploy:** Vercel — production from `main`, a preview for every branch

Design is [DabDesign](https://github.com/dabaz-official/DabDesign) (personal
series theme). Typography is
[DabFonts](https://github.com/dabaz-official/DabFonts). Process is
[DabAgents](https://github.com/dabaz-official/DabAgents). Pins live in
[`AGENTS.md`](AGENTS.md).

## Quick start

```sh
pnpm install
pnpm dev
```

Node 24 (`.nvmrc`), pnpm 12.

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Static build to `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm lint` | Token guard plus the Chinese copy-spacing guard |
| `pnpm typecheck` | `astro sync && tsc --noEmit` |
| `pnpm icons` | Export the favicon, Apple icon, and manifest icons from `public/icon.svg` |
| `pnpm og` | Render the two 1200×630 OG cards (needs Chrome) |
| `pnpm glyphs` | Refresh `scripts/home-glyphs.txt` from `dist/` (run after a build) |
| `pnpm subset` | Regenerate the two home-only font subsets (needs `scripts/requirements.txt`) |
| `pnpm check` | Gate: lint, typecheck, build, metadata guard, home-subset guard |

## Structure

```text
public/           fonts, the supplied icon master and exports, OG cards, robots, manifest — served as-is
src/
  assets/         the portrait, imported through astro:assets
  components/     shared primitives, the shell, home sections, and writing rows
  content/        works, experience, profile/interface copy, and writing posts
  data/           site identity and social links
  layouts/        BaseLayout — head, skip link, slots, theme attribute
  lib/            locale seam, metadata and date helpers, writing helpers
  pages/          routes: `/`, `/zh`, writing, posts, tags, `/rss.xml`, `/zh/rss.xml`
  styles/         tokens.css (the only design values) and global.css
scripts/          check-tokens.mjs and check-copy.mjs, the lint gate
docs/             working handoff for the rebuild (deleted after merge)
```

## Documentation

- [`src/CONVENTIONS.md`](src/CONVENTIONS.md) — the day-to-day contract: tokens,
  theme, primitives, islands, naming, content, contrast.
- [`AGENTS.md`](AGENTS.md) — pins, stack, commands, Definition of Done.
- [`DESIGN.md`](DESIGN.md) — the composition contract for the finished site.

## Deployment

Vercel builds with `pnpm build` and publishes `dist/` (`vercel.json`). Every
branch gets a preview URL; `main` owns production. No adapter, no server
runtime, no edge function.
