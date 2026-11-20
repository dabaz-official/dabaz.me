#!/usr/bin/env node
/**
 * Token guard.
 *
 * Design values live in `src/styles/tokens.css` only. This check fails the
 * build when a component, layout, page, or script declares a hex colour, a
 * letter-spacing, or a raw font size instead of using a role.
 *
 * Run with `pnpm lint`; it is part of `pnpm check` and therefore CI.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src", import.meta.url));
const tokenFile = join("styles", "tokens.css");
const extensions = [".astro", ".ts", ".css", ".js", ".mjs"];

const rules = [
  {
    label: "hex colour",
    // `#main` and other anchors are not hex: require 3, 4, 6, or 8 digits.
    pattern: /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/,
    hint: "use a colour role from src/styles/tokens.css",
  },
  {
    label: "letter-spacing",
    pattern: /letter-spacing/i,
    hint: "tracking is zero everywhere; delete the declaration",
  },
  {
    label: "raw font-size",
    pattern: /font-size\s*:/i,
    hint: "use a type role (type-display … type-caption)",
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

for await (const path of walk(root)) {
  const name = relative(root, path);
  if (name === tokenFile) continue;
  checked += 1;

  const lines = (await readFile(path, "utf8")).split("\n");
  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        violations.push({ name, line: index + 1, rule, text: line.trim() });
      }
    }
  });
}

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(
      `src/${violation.name}:${violation.line} ${violation.rule.label}: ${violation.text}\n  ${violation.rule.hint}`,
    );
  }
  console.error(`\n${violations.length} token violation(s).`);
  process.exit(1);
}

console.log(`tokens: ${checked} files, no raw design values.`);
