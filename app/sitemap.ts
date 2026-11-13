import type { MetadataRoute } from "next";

import site from "@dabaz/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.values(site.locales).map((loc) => [
      loc.hreflang,
      new URL(loc.path, site.url).toString(),
    ]),
  );

  return Object.values(site.locales).map((loc) => ({
    url: new URL(loc.path, site.url).toString(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
