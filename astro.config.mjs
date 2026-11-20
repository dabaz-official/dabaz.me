// @ts-check
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Canonical origin. The domain switch stays with thread 5; this value only
  // makes canonical URLs absolute.
  site: "https://dabaz.me",
  output: "static",
  // `/` is English, `/zh` is Chinese (DESIGN.md §11). Astro's routing only
  // checks the prefix; the pages themselves live in `src/pages/zh/`.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    routing: { prefixDefaultLocale: false },
  },
  // Posts are authored in MDX so a body can embed the shared components
  // (`ContentImage`, the prose element map). Build-time only: no client runtime.
  integrations: [mdx()],
  // Code blocks are styled by `.prose` from tokens. Shiki's themes would carry
  // their own hex colours and a light/dark mismatch, which the token contract
  // forbids; plain `<pre><code>` keeps one palette for both themes.
  markdown: { syntaxHighlight: false },
  // HTML-aware whitespace compression keeps the single space between inline
  // elements, which the type system relies on (CJK–Latin spacing, meta rows).
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
