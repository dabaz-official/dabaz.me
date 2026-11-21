import { readFileSync } from "node:fs";

/**
 * The characters the two home routes actually render.
 *
 * Shared by `build-home-glyphs.mjs` (which writes the list) and
 * `check-home-subset.mjs` (which guards it), so the two can never disagree
 * about what "home text" means.
 *
 * `<head>` is dropped: the title is not painted with the body font. Comments,
 * scripts and styles are dropped for the same reason. Tags are stripped, so
 * attribute values (alt text, aria labels) never count.
 */

const NAMED = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
};

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (match, entity) => {
    if (entity.startsWith("#")) {
      const hex = entity[1]?.toLowerCase() === "x";
      const codePoint = hex
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return NAMED[entity.toLowerCase()] ?? match;
  });
}

export const HOME_PAGES = ["dist/index.html", "dist/zh/index.html"];

export function homeCharacters() {
  const characters = new Set();

  for (const page of HOME_PAGES) {
    const html = readFileSync(page, "utf8")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ");

    for (const character of decode(html)) {
      if (character === " " || character.trim() !== "") {
        characters.add(character);
      }
    }
  }

  return [...characters].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
}
