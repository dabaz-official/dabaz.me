import { headers } from "next/headers";

import type { Locale } from "@dabaz/data/site";

/**
 * The proxy stamps every request with its pathname. The root layout reads it
 * to pick the document locale, since the home route lives at `/` and `/zh`
 * rather than behind a visible `[lang]` segment.
 */
export async function requestLocale(): Promise<Locale> {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}
