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
 * One rule goes beyond the specification: an opening bracket or quote that
 * follows text takes one U+0020 before it, as an English page writes
 * `sleep (REM)` and `he said "no"`. DabFonts §0 has the opening mark hug the
 * preceding text; AGENTS.md records the departure. A markup boundary is not
 * text, so `**"Chicago"**` keeps its first mark glued to the emphasis.
 *
 * Emphasis hugs its content. A run of `**` that touches a space never renders
 * as bold: CommonMark reads `**程序管理器 （Program Manager） **` as plain text,
 * prints the asterisks and lets the run swallow the paragraph that follows.
 * The space the typography asks for sits after the closing run instead —
 * `**程序管理器 （Program Manager）**——` — which is why a Chinese mark may touch
 * a closing `**`, and why only closing runs are set aside before the spacing
 * rules are applied.
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

// Marks that need a space before the next text character, and the marks that
// open a pair and need one before themselves. Adjacent marks (。”, 》，, “（)
// take neither.
const marks = "。，、：；！？．）］｝〉》」』】〕”’…";
const opening = "（［｛〈《「『【〔“‘";
const textStart = `[\\u3400-\\u9fffA-Za-z0-9*\\[]`;

const rules = [
  {
    label: "mark needs one space after it",
    pattern: new RegExp(`[${marks}](?=${textStart})`),
    hint: "write the Chinese mark, then one U+0020, then the text",
  },
  {
    label: "opening mark needs one space before it",
    pattern: new RegExp(`[\\u3400-\\u9fffA-Za-z0-9${marks}](?=[${opening}])`),
    hint: "put one U+0020 before the opening mark, then the mark, then its content",
  },
  {
    label: "Han and Latin need one space between them",
    pattern: /[\u3400-\u9fff][A-Za-z0-9]|[A-Za-z0-9][\u3400-\u9fff]/,
    hint: "add one U+0020 between Han and Latin letters or digits",
  },
];

const emphasisRules = new Map([
  [
    "emphasis cannot open on a space",
    "write `**文字**`, never `** 文字**`",
  ],
  [
    "emphasis cannot close on a space",
    "close the run on the text and put the space after it: `**文字** 后面`",
  ],
  [
    "every `**` needs a partner",
    "a run without its closing `**` prints as plain text and bolds the rest of the paragraph",
  ],
  [
    "an opening `**` before a bracket or quote needs a space in front of it",
    "write `测试 **“引号”**`, not `测试**“引号”**`: a run glued to text and followed by punctuation never opens",
  ],
]);

const emphasis = /\*\*([^*]*?)\*\*/g;

// CommonMark keeps a run from opening when punctuation follows it and text sits
// directly before it; a preceding space or mark lets it open.
const punctuation = `${opening}${marks}—"'([{`;

/** Every `**` run on the line, in order; they alternate open and close. */
function runs(line) {
  return [...line.matchAll(/\*\*/g)].map((match) => match.index);
}

/**
 * The line with its closing runs removed, so a Chinese mark may touch one.
 * A line with an odd number of runs is already broken by the emphasis rules,
 * so it is left as written.
 */
function withoutClosingRuns(line) {
  const positions = runs(line);
  if (positions.length % 2 === 1) return line;
  let stripped = line;
  for (let i = positions.length - 2; i >= 0; i -= 2) {
    const close = positions[i + 1];
    stripped = stripped.slice(0, close) + stripped.slice(close + 2);
  }
  return stripped;
}

/** Emphasis diagnostics for one line, as rule labels. */
function emphasisProblems(line) {
  const labels = new Set();
  for (const [, content] of line.matchAll(emphasis)) {
    if (/^\s/.test(content)) labels.add("emphasis cannot open on a space");
    if (/\s$/.test(content)) labels.add("emphasis cannot close on a space");
  }
  if (line.replace(emphasis, "").includes("**")) {
    labels.add("every `**` needs a partner");
  }
  const positions = runs(line);
  if (positions.length % 2 === 0) {
    for (let i = 0; i < positions.length; i += 2) {
      const before = line[positions[i] - 1] ?? " ";
      const after = line[positions[i] + 2] ?? " ";
      if (
        !/[\s\u3000]/.test(before) &&
        !punctuation.includes(before) &&
        punctuation.includes(after)
      ) {
        labels.add("an opening `**` before a bracket or quote needs a space in front of it");
      }
    }
  }
  return labels;
}

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
      const report = (rule) =>
        violations.push({
          name: relative(root, path),
          line: index + 1,
          rule,
          text: line.trim(),
        });
      const spacing = withoutClosingRuns(line);
      for (const rule of rules) {
        if (rule.pattern.test(spacing)) report(rule);
      }
      for (const label of emphasisProblems(line)) {
        report({ label, hint: emphasisRules.get(label) });
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
