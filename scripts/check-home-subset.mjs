import { readFileSync } from "node:fs";

import { homeCharacters } from "./home-text.mjs";

/**
 * Guard: every character the home pages render must be in the committed glyph
 * list, or the subset silently falls back to the 1.6 MB full faces.
 *
 * Runs after `astro build`. A failure means the copy changed without
 * `pnpm glyphs && pnpm subset`.
 */

const declared = new Set(
  readFileSync("scripts/home-glyphs.txt", "utf8").replace(/\n/g, ""),
);
const used = homeCharacters();
const missing = used.filter((character) => !declared.has(character));
const unused = [...declared].filter((character) => !used.includes(character));

if (missing.length > 0) {
  const list = missing
    .map((character) => `${JSON.stringify(character)} U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
    .join(", ");

  console.error(
    `home subset: ${missing.length} character(s) render on the home pages but are not in scripts/home-glyphs.txt:\n  ${list}\n` +
      "Run `pnpm build && pnpm glyphs && pnpm subset`, then commit scripts/home-glyphs.txt and public/fonts/DabSansHome-*.woff2.",
  );
  process.exit(1);
}

console.log(
  `home subset: ${used.length} characters covered by scripts/home-glyphs.txt` +
    (unused.length > 0 ? ` (${unused.length} unused)` : ""),
);
