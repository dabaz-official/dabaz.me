import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import site from "@dabaz/data/site";

export const alt = site.pageTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpengraphImage() {
  const [display, mono] = await Promise.all([
    readFile(
      path.join(process.cwd(), "styles/fonts/ClashDisplay-Semibold.ttf"),
    ),
    readFile(path.join(process.cwd(), "styles/fonts/GeistMono-Regular.ttf")),
  ]);

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
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.pageTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "mono",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#6f6b62",
            }}
          >
            {site.tagline}
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
      ...size,
      fonts: [
        { name: "display", data: display, weight: 600, style: "normal" },
        { name: "mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
