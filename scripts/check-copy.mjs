#!/usr/bin/env node
/**
 * Copy guard.
 *
 * Chinese copy follows DabFonts TYPESETTING.md §3–§4: a sentence or closing
 * mark that is followed by text takes exactly one U+0020; Han and Latin letters
 * or digits are separated by one space. The font's punctuation is half-width,
 * so the space is what gives the mark its right sidebearing; without it the
 * page reads tight and the specification is broken.
 *
 * This check reads the copy home only — `src/content/` and `src/data/` — so it
 * cannot mistake a CSS class or a template expression for Chinese prose.
 *
 * Run with `pnpm lint`; it is part of `pnpm check` and therefore CI.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src", import.meta.url));
const roots = [join(root, "content"), join(root, "data")];
const extensions = [".ts", ".md", ".mdx"];

const han = /[\u3400-\u9fff]/;

// Marks that need a space before the next text character. Adjacent marks
// (。”, 》，) and opening marks (“, （, 《) never take one, so they are part of
// the "allowed next" set rather than the match.
const marks = "。，、：；！？．）］｝〉》」』】〕”’…";
const adjacent = `${marks}（［｛〈《「『【〔“‘`;
const textStart = `[\\u3400-\\u9fffA-Za-z0-9*\\[]`;

const rules = [
  {
    label: "mark needs one space after it",
    pattern: new RegExp(`[${marks}](?=${textStart})`),
    hint: "write the Chinese mark, then one U+0020, then the text",
  },
  {
    label: "Han and Latin need one space between them",
    pattern: /[\u3400-\u9fff][A-Za-z0-9]|[A-Za-z0-9][\u3400-\u9fff]/,
    hint: "add one U+0020 between Han and Latin letters or digits",
  },
];

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (extensions.some((ext) => entry.name.endsWith(ext))) yield path;
  }
}

const violations = [];
let checked = 0;

for (const start of roots) {
  for await (const path of walk(start)) {
    checked += 1;
    const lines = (await readFile(path, "utf8")).split("\n");
    lines.forEach((line, index) => {
      if (!han.test(line)) return;
      for (const rule of rules) {
        if (rule.pattern.test(line)) {
          violations.push({
            name: relative(root, path),
            line: index + 1,
            rule,
            text: line.trim(),
          });
        }
      }
    });
  }
}

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(
      `src/${violation.name}:${violation.line} ${violation.rule.label}: ${violation.text}\n  ${violation.rule.hint}`,
    );
  }
  console.error(`\n${violations.length} copy violation(s).`);
  process.exit(1);
}

console.log(`copy: ${checked} files, Chinese spacing follows DabFonts.`);
