// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Canonical origin. The domain switch stays with thread 5; this value only
  // makes canonical URLs absolute.
  site: "https://dabaz.me",
  output: "static",
  // HTML-aware whitespace compression keeps the single space between inline
  // elements, which the type system relies on (CJK–Latin spacing, meta rows).
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
