#!/usr/bin/env node
/**
 * Icon exports from the supplied plate master (`public/icon.svg`).
 *
 * Rule 10 treats one supplied SVG as the plate master: it covers the browser,
 * iOS, standard manifest, and maskable surfaces. Nothing is re-rounded, padded,
 * or recoloured; the baked radius (108/512 = 21.1%) stays inside iOS's ~22.4%
 * squircle, and the transparent area stays outside the plate only.
 *
 * Run with `pnpm icons` after the master changes. The outputs are committed so
 * a Vercel build needs no image tooling beyond the dependency already used for
 * `astro:assets`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(root, "public");
const master = await readFile(join(publicDir, "icon.svg"));
await mkdir(join(publicDir, "icons"), { recursive: true });

const png = (size) =>
  sharp(master, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();

const apple = await png(180);
const icon192 = await png(192);
const icon512 = await png(512);
const maskable512 = await png(512);

await writeFile(join(publicDir, "apple-icon.png"), apple);
await writeFile(join(publicDir, "icons", "icon-192.png"), icon192);
await writeFile(join(publicDir, "icons", "icon-512.png"), icon512);
await writeFile(join(publicDir, "icons", "icon-maskable-512.png"), maskable512);

/**
 * A multi-resolution ICO with PNG payloads (16/32/48). The container is the
 * Vista+ form: a 6-byte ICONDIR, one 16-byte entry per image, then the PNGs.
 */
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => png(size)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

let offset = 6 + images.length * 16;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[index] >= 256 ? 0 : sizes[index], 0);
  entry.writeUInt8(sizes[index] >= 256 ? 0 : sizes[index], 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});

await writeFile(
  join(publicDir, "favicon.ico"),
  Buffer.concat([header, ...entries, ...images]),
);

console.log(
  `icons: apple 180, manifest 192/512/maskable 512, favicon ${sizes.join("/")}.`,
);
