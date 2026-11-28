#!/usr/bin/env node
/**
 * Icon exports from the two supplied masters.
 *
 * `public/icon.svg` is the plate for the browser, iOS and the standard manifest
 * surfaces; `public/icon-maskable.svg` is the maskable plate. Nothing is
 * re-rounded, padded, or recoloured. The plate's baked radius (108/512 = 21.1%)
 * stays inside iOS's ~22.4% squircle, and the maskable master paints its own
 * full-bleed white field (rx=112) for the launcher mask to crop.
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
const maskableMaster = await readFile(join(publicDir, "icon-maskable.svg"));
await mkdir(join(publicDir, "icons"), { recursive: true });

const png = (source, size) =>
  sharp(source, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();

const apple = await png(master, 180);
const icon192 = await png(master, 192);
const icon512 = await png(master, 512);
const maskable512 = await png(maskableMaster, 512);

await writeFile(join(publicDir, "apple-icon.png"), apple);
await writeFile(join(publicDir, "icons", "icon-192.png"), icon192);
await writeFile(join(publicDir, "icons", "icon-512.png"), icon512);
await writeFile(join(publicDir, "icons", "icon-maskable-512.png"), maskable512);

/**
 * A multi-resolution ICO with PNG payloads (16/32/48). The container is the
 * Vista+ form: a 6-byte ICONDIR, one 16-byte entry per image, then the PNGs.
 */
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => png(master, size)));
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
