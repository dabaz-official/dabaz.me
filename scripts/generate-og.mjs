#!/usr/bin/env node
/**
 * The two default OG cards, one per locale (DabAgents rule 10 §5, DESIGN.md
 * §11). 1200×630, light theme, 80px padding, no gradients or screenshots.
 *
 * The card is drawn as HTML so it uses the real Dab Sans faces rather than a
 * system fallback; Chrome renders it once at build/authoring time and the PNG
 * is committed. Layout follows `DabAgents/templates/og-image.md`: the home card
 * omits the wordmark, titles the site name, and uses the tagline as the
 * supporting line.
 *
 * Run with `pnpm og`. Set `CHROME_PATH` when Chrome is not at the macOS
 * default. The build itself does not need Chrome: `public/og/*.png` is
 * committed.
 */
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import site from "../src/data/site.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(chrome)) {
  throw new Error(
    `Chrome not found at ${chrome}. Set CHROME_PATH to generate the OG cards.`,
  );
}

const font = (name) => pathToFileURL(join(root, "public/fonts", name)).href;

const html = (locale) => `<!doctype html>
<html lang="${locale === "zh" ? "zh-CN" : "en"}">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: "Dab Sans";
        src: url("${font("DabSans-Regular.woff2")}") format("woff2");
        font-weight: 400;
        font-display: block;
      }
      @font-face {
        font-family: "Dab Sans";
        src: url("${font("DabSans-SemiBold.woff2")}") format("woff2");
        font-weight: 600;
        font-display: block;
      }
      * { box-sizing: border-box; }
      html, body {
        width: 1200px;
        height: 630px;
        margin: 0;
        overflow: hidden;
        background: #fafafa;
        color: #171717;
        font-family: "Dab Sans", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 80px;
      }
      h1 {
        margin: 0;
        font-size: 48px;
        font-weight: 600;
        line-height: 1.1;
      }
      p {
        max-width: 900px;
        margin: 24px 0 0;
        color: #404040;
        font-size: 24px;
        font-weight: 400;
        line-height: 1.4;
      }
      footer {
        position: absolute;
        inset-inline: 80px;
        inset-block-end: 80px;
        display: flex;
        justify-content: space-between;
        color: #525252;
        font-size: 16px;
        font-weight: 400;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${site.name}</h1>
      <p>${site.tagline[locale]}</p>
    </main>
    <footer>
      <span>dabaz.me</span>
      <span>${new Date().getFullYear()}</span>
    </footer>
  </body>
</html>`;

await mkdir(join(root, "public/og"), { recursive: true });
const work = await mkdtemp(join(tmpdir(), "dabaz-og-"));

try {
  for (const locale of ["en", "zh"]) {
    const page = join(work, `${locale}.html`);
    const output = join(root, "public/og", `${locale}.png`);
    await writeFile(page, html(locale));

    await new Promise((resolve, reject) => {
      const child = spawn(
        chrome,
        [
          "--headless=new",
          "--disable-gpu",
          "--hide-scrollbars",
          "--no-first-run",
          "--no-default-browser-check",
          `--user-data-dir=${join(work, "profile")}`,
          "--force-device-scale-factor=1",
          "--window-size=1200,630",
          "--virtual-time-budget=5000",
          `--screenshot=${output}`,
          pathToFileURL(page).href,
        ],
        { stdio: ["ignore", "ignore", "pipe"] },
      );
      let stderr = "";
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });
      child.on("error", reject);
      child.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Chrome exited ${code}: ${stderr}`));
      });
    });

    console.log(`og: public/og/${locale}.png`);
  }
} finally {
  await rm(work, { recursive: true, force: true });
}
