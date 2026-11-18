# dabaz.me

Personal site of DabAZ: work, writing, and contact. Static HTML, self-hosted
fonts, no client runtime beyond the theme toggle.

The rebuild is in progress on `rebuild`. This branch ships the foundation —
tokens, fonts, the document shell, shared primitives, CI — and the home page:
hero, work, earlier roles, about, and contact. Writing and `/zh` follow in their
own threads.

## Stack

- **Framework:** Astro 7.4.12, fully static, no adapter
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
| `pnpm lint` | Token guard: no raw design values outside `src/styles/tokens.css` |
| `pnpm typecheck` | `astro sync && tsc --noEmit` |
| `pnpm check` | Gate: lint, typecheck, build. CI runs this. |

## Structure

```text
public/           fonts and favicon — served as-is
src/
  assets/         the portrait, imported through astro:assets
  components/     shared primitives, the shell, and the home sections
  content/        works, experience, and profile copy; writing lands in thread 3
  data/           site identity and social links
  layouts/        BaseLayout — head, theme script, skip link, slots
  lib/            i18n seam, metadata helper
  pages/          routes; `/` is the home page
  styles/         tokens.css (the only design values) and global.css
scripts/          check-tokens.mjs, the lint gate
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
