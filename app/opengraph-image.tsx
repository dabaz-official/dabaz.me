import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "DabAZ — hacker · musician · designer · developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const identities = ["HACKER", "MUSICIAN", "DESIGNER", "DEVELOPER"];

export default async function OpengraphImage() {
  const [clash, mono] = await Promise.all([
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
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0b",
          padding: "72px",
          color: "#edede9",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "mono",
            fontSize: 26,
            color: "#6e6e6a",
          }}
        >
          {"$ whoami --profile dabaz"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
          {identities.map((word) => (
            <div
              key={word}
              style={{
                display: "flex",
                fontFamily: "clash",
                fontWeight: 600,
                fontSize: 88,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {word}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "mono",
            fontSize: 24,
            color: "#6e6e6a",
            marginTop: 24,
          }}
        >
          <span style={{ color: "#b8ff29", paddingRight: 10 }}>{">"}</span>
          building things that make noise — in code, in sound, in pixels.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "clash", data: clash, weight: 600, style: "normal" },
        { name: "mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
