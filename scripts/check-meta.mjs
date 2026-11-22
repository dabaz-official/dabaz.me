#!/usr/bin/env node
/**
 * Metadata guard over the built site.
 *
 * Runs after `astro build` as part of `pnpm check`. It asserts the surfaces
 * rule 10 owns: one `<h1>` and title per page, the title pattern, the shared
 * description, the canonical/OG URL, a 1200×630 OG PNG, the icon files, the
 * manifest, the sitemap and robots, `hreflang`, and the JavaScript budget:
 * the one shared bootstrap plus the home showcase module, nothing else.
 *
 * A record's own summary may be shorter than rule 07's 120-character floor;
 * the guard reports that as a warning instead of padding owner copy.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist", import.meta.url));
const siteUrl = "https://dabaz.me";
const errors = [];
const warnings = [];

const decode = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const stripTags = (value) =>
  decode(value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim());

const units = (value) =>
  [...value].reduce((total, char) => total + (/[\u3400-\u9fff]/.test(char) ? 2 : 1), 0);

function attrs(tag) {
  const result = {};
  for (const match of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)="([^"]*)"/g)) {
    result[match[1].toLowerCase()] = decode(match[2]);
  }
  return result;
}

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const files = [];
for await (const path of walk(root)) files.push(path);

const htmlFiles = files.filter((path) => path.endsWith(".html"));
const jsFiles = files.filter((path) => path.endsWith(".js"));

/**
 * The JavaScript budget (AGENTS.md § Project rules, CONVENTIONS.md §6): one
 * inline bootstrap that swaps `no-js` for `js` before paint, and one bundled
 * module behind the home work showcase. A third artifact is a second budget
 * line, so it fails here instead of shipping quietly.
 */
const INLINE_BOOTSTRAP =
  'document.documentElement.classList.replace("no-js", "js");';
/** Astro inlines a small module; this marker proves which one it is. */
const SHOWCASE_MARKER = "[data-showcase]";
const HOME_PAGES = new Set(["index.html", "zh/index.html"]);
const referencedScripts = new Set();

const ogFiles = new Map();
for (const path of files.filter((file) => file.endsWith(".png") && file.includes("/og/"))) {
  const buffer = await readFile(path);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  ogFiles.set(relative(root, path), { width, height, bytes: buffer.length });
}

function checkMeta(metas, name) {
  return metas.some((tag) => tag.name === name || tag.property === name);
}

for (const path of htmlFiles) {
  const rel = relative(root, path);
  const html = await readFile(path, "utf8");
  const isHome = rel === "index.html" || rel === "zh/index.html";
  const isUtility = rel.startsWith("404");
  const isPagination = /\/page\/\d+\/index\.html$/.test(rel);

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  if (titles.length !== 1) {
    errors.push(`${rel}: expected one <title>, found ${titles.length}`);
  }
  const title = titles[0] ? stripTags(titles[0][1]) : "";
  const titlePattern = isHome ? /^DabAZ - .+$/ : / - DabAZ$/;
  if (!titlePattern.test(title)) {
    errors.push(`${rel}: title does not match the rule 10 pattern: "${title}"`);
  }
  if ((title.match(/DabAZ/g) ?? []).length !== 1) {
    errors.push(`${rel}: the site name must appear once in <title>: "${title}"`);
  }
  if (units(title) > 60) {
    errors.push(`${rel}: <title> is ${units(title)} units, over the 60 budget`);
  }

  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  if (headings.length !== 1) {
    errors.push(`${rel}: expected one <h1>, found ${headings.length}`);
  }
  const heading = headings[0] ? stripTags(headings[0][1]) : "";

  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attrs(match[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0]));
  const meta = (name) => metas.find((tag) => tag.name === name)?.content;
  const property = (name) => metas.find((tag) => tag.property === name)?.content;

  const htmlTag = html.match(/<html\b[^>]*>/);
  const lang = htmlTag ? attrs(htmlTag[0]).lang ?? "en" : "en";
  const isZh = lang.startsWith("zh");

  const description = meta("description");
  const noindex = (meta("robots") ?? "").includes("noindex");
  if (!description) errors.push(`${rel}: missing meta description`);
  else {
    const length = [...description].length;
    const max = isZh ? 90 : 160;
    const floor = isZh ? 60 : 120;
    if (length > max) errors.push(`${rel}: description is ${length} characters (max ${max})`);
    if (!noindex && length < floor) warnings.push(`${rel}: description is ${length} characters, under rule 07's ${floor} floor`);
  }

  const canonical = links.find((tag) => tag.rel === "canonical")?.href;
  if (!canonical || !canonical.startsWith(`${siteUrl}/`)) {
    errors.push(`${rel}: missing or relative canonical`);
  }
  if (canonical !== property("og:url")) {
    errors.push(`${rel}: canonical and og:url differ`);
  }

  if (checkMeta(metas, "og:title") && property("og:title") !== heading && !isPagination && !isUtility) {
    errors.push(`${rel}: og:title "${property("og:title")}" does not match the h1 "${heading}"`);
  }
  if (property("og:description") !== description || meta("twitter:description") !== description) {
    errors.push(`${rel}: meta, og, and twitter descriptions differ`);
  }
  if (meta("twitter:title") !== property("og:title")) {
    errors.push(`${rel}: twitter:title and og:title differ`);
  }
  if (meta("twitter:card") !== "summary_large_image") {
    errors.push(`${rel}: twitter:card is not summary_large_image`);
  }
  if (!property("og:site_name")) errors.push(`${rel}: missing og:site_name`);
  if (!property("og:locale")) errors.push(`${rel}: missing og:locale`);

  const image = property("og:image");
  if (!image?.startsWith(`${siteUrl}/`)) {
    errors.push(`${rel}: missing absolute og:image`);
  } else {
    const local = image.slice(siteUrl.length + 1);
    const png = ogFiles.get(local);
    if (!png) errors.push(`${rel}: og:image ${local} was not emitted`);
    else {
      if (png.width !== 1200 || png.height !== 630) {
        errors.push(`${rel}: og:image is ${png.width}×${png.height}, expected 1200×630`);
      }
      if (png.bytes > 5 * 1024 * 1024) errors.push(`${rel}: og:image exceeds 5 MB`);
    }
  }
  if (meta("twitter:image") !== image) errors.push(`${rel}: twitter:image differs from og:image`);

  const hreflangs = links.filter((tag) => tag.rel === "alternate" && tag.hreflang);
  if (!hreflangs.some((tag) => tag.hreflang === "x-default")) {
    errors.push(`${rel}: missing hreflang="x-default"`);
  }
  if (!hreflangs.some((tag) => tag.href === canonical)) {
    errors.push(`${rel}: hreflang set does not include the canonical URL`);
  }

  if (!links.some((tag) => tag.rel === "icon" && tag.href === "/icon.svg")) {
    errors.push(`${rel}: missing /icon.svg favicon`);
  }
  if (!links.some((tag) => tag.rel === "apple-touch-icon" && tag.href === "/apple-icon.png")) {
    errors.push(`${rel}: missing apple-touch-icon`);
  }
  if (!links.some((tag) => tag.rel === "manifest")) errors.push(`${rel}: missing manifest link`);

  let showcaseModules = 0;

  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attributes = attrs(match[1]);

    if (attributes.type === "application/ld+json") {
      try {
        JSON.parse(decode(match[2]));
      } catch {
        errors.push(`${rel}: JSON-LD does not parse`);
      }
      continue;
    }

    if (attributes.src) {
      if (!HOME_PAGES.has(rel)) {
        errors.push(`${rel}: unexpected module script ${attributes.src}`);
      } else if (!/^\/_astro\/[\w.-]+\.js$/.test(attributes.src)) {
        errors.push(`${rel}: module script must be a built file under /_astro`);
      } else {
        referencedScripts.add(attributes.src.slice(1));
        showcaseModules += 1;
      }
      continue;
    }

    const body = match[2].replace(/\s+/g, " ").trim();

    if (body === INLINE_BOOTSTRAP) continue;

    // Astro inlines a small module into the page; it must be the showcase, on
    // a home route, and only once.
    if (
      attributes.type === "module" &&
      HOME_PAGES.has(rel) &&
      body.includes(SHOWCASE_MARKER)
    ) {
      showcaseModules += 1;
      continue;
    }

    errors.push(`${rel}: unexpected inline script`);
  }

  if (HOME_PAGES.has(rel) && showcaseModules !== 1) {
    errors.push(`${rel}: expected one showcase module, found ${showcaseModules}`);
  }
}

for (const path of jsFiles) {
  const name = relative(root, path);
  if (!referencedScripts.has(name)) errors.push(`unreferenced JavaScript: ${name}`);
}
if (referencedScripts.size > 1) {
  errors.push(
    `JavaScript budget: ${referencedScripts.size} modules (${[...referencedScripts].join(", ")})`,
  );
}

for (const file of [
  "icon.svg",
  "favicon.ico",
  "apple-icon.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "fonts/DabSansHome-Regular.woff2",
  "fonts/DabSansHome-SemiBold.woff2",
]) {
  try {
    await stat(join(root, file));
  } catch {
    errors.push(`missing public/${file}`);
  }
}
for (const file of ["icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"]) {
  try {
    await stat(join(root, file));
  } catch {
    errors.push(`missing public/${file}`);
  }
}

try {
  const manifest = JSON.parse(await readFile(join(root, "site.webmanifest"), "utf8"));
  if (manifest.name !== "DabAZ") errors.push("manifest: name is not DabAZ");
  if (manifest.short_name.length > 12) errors.push("manifest: short_name exceeds 12 characters");
  if (manifest.start_url !== "/") errors.push("manifest: start_url is not /");
  if (manifest.display !== "standalone") errors.push("manifest: display is not standalone");
  const sizes = new Set((manifest.icons ?? []).map((icon) => icon.sizes));
  for (const size of ["192x192", "512x512"]) {
    if (!sizes.has(size)) errors.push(`manifest: missing ${size} icon`);
  }
  if (!(manifest.icons ?? []).some((icon) => icon.purpose === "maskable")) {
    errors.push("manifest: missing maskable icon");
  }
} catch {
  errors.push("manifest: does not parse");
}

try {
  const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
  if (!sitemap.includes("<urlset")) errors.push("sitemap: missing urlset");
  if (!sitemap.includes(`${siteUrl}/</loc>`)) errors.push("sitemap: missing the English home");
  if (!sitemap.includes(`${siteUrl}/zh</loc>`)) errors.push("sitemap: missing the Chinese home");
  if (sitemap.includes("/page/1<")) errors.push("sitemap: page 1 must not be a separate URL");
} catch {
  errors.push("sitemap: does not read");
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const error of errors) console.error(`fail  ${error}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} metadata failure(s).`);
  process.exit(1);
}

console.log(
  `meta: ${htmlFiles.length} pages, titles, OG, icons, manifest, sitemap, and hreflang check out.`,
);
