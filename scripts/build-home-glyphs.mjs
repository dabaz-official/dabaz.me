import { writeFileSync } from "node:fs";

import { homeCharacters } from "./home-text.mjs";

/**
 * Rewrites `scripts/home-glyphs.txt` from the built home pages.
 *
 * Run after `pnpm build`. The list is the input for `pnpm subset`; keeping it
 * generated instead of hand-maintained is what lets the guard in
 * `check-home-subset.mjs` mean something.
 */

const characters = homeCharacters();
writeFileSync("scripts/home-glyphs.txt", `${characters.join("")}\n`);

console.log(
  `glyphs: ${characters.length} characters from dist/index.html and dist/zh/index.html -> scripts/home-glyphs.txt`,
);
