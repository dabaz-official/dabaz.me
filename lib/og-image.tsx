import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import site, { type Locale } from "@dabaz/data/site";

const fontDir = path.join(process.cwd(), "styles/fonts");

/**
 * One OG template for the whole site. Locales only swap the rendered copy and
 * the font that carries it; the layout stays identical.
 */
export async function createOgImage(locale: Locale) {
  const loc = site.locales[locale];
  const isZh = locale === "zh";

  const [display, sans, mono] = await Promise.all([
    readFile(path.join(fontDir, "DabSans-SemiBold-og.ttf")),
    readFile(path.join(fontDir, "DabSans-Regular-og.ttf")),
    readFile(path.join(fontDir, "DabMono-Regular-og.ttf")),
  ]);

  const fonts: {
    name: string;
    data: Buffer;
    weight: 400 | 600;
    style: "normal";
  }[] = [
    { name: "display", data: display, weight: 600, style: "normal" },
    { name: "sans", data: sans, weight: 400, style: "normal" },
    { name: "mono", data: mono, weight: 400, style: "normal" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: site.theme.light,
          padding: 80,
          color: "#141412",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "display",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontFamily: "display",
              fontSize: 48,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: isZh ? "0" : "-0.02em",
            }}
          >
            {loc.pageTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: isZh ? "sans" : "mono",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#6f6b62",
            }}
          >
            {loc.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "mono",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#6f6b62",
          }}
        >
          <span>{new URL(site.url).host}</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );
}
