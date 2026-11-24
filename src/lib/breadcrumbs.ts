/**
 * The footer's breadcrumb — one trail per page, read from the page's own path.
 *
 * The footer's mark is the trail's root: it links home, so the trail starts at
 * the section and never repeats the home page. A section route (`/work`) has
 * one crumb, the page itself; a leaf adds its own title. A post is titled by
 * its headline, not its slug, and a work by the record's title.
 *
 * The trail is derived rather than passed, so a route cannot ship without one:
 * `SiteFooter` receives the page's `path` and `title` from `BaseLayout` and
 * this module turns them into crumbs. Nothing here is client-side.
 */
import ui from "../content/ui";
import {
  contactPath,
  defaultLocale,
  musicPath,
  type Locale,
  workPath,
} from "./i18n";
import { writingPath } from "./writing";

/** One step in the trail. The last step has no `href`: it is this page. */
export interface Crumb {
  label: string;
  href?: string;
}

/** The record a work crumb needs; `site` collection entries satisfy this. */
export interface WorkTitle {
  id: string;
  title: string;
}

export interface TrailInput {
  /** The page's site-relative path, e.g. `/work/dabmusic`. */
  path: string;
  locale: Locale;
  /** The page title, used for the last crumb on a leaf route. */
  title: string;
  /** Work titles, so `/work/<id>` reads `DabMusic` and not `dabmusic`. */
  works?: readonly WorkTitle[];
}

/** Decode one segment; a malformed escape is kept as written, not fatal. */
function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** The path under the locale prefix: `/zh/work` and `/work` are both `/work`. */
function withoutLocale(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  const prefix = `/${locale}`;
  if (path === prefix) return "/";
  return path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path;
}

export function breadcrumbTrail({
  path,
  locale,
  title,
  works = [],
}: TrailInput): Crumb[] {
  const [first, second, third] = withoutLocale(path, locale)
    .split("/")
    .filter(Boolean)
    .map(decode);

  const sections = {
    work: { label: ui.nav.work[locale], href: workPath(locale) },
    music: { label: ui.nav.music[locale], href: musicPath(locale) },
    writing: { label: ui.nav.writing[locale], href: writingPath(locale) },
    contact: { label: ui.nav.contact[locale], href: contactPath(locale) },
  } as const;

  // Home has no trail — the mark is the root. An unknown first segment (the
  // 404) has no level to name, so it stays empty rather than inventing one.
  if (!first || !(first in sections)) return [];

  const section = sections[first as keyof typeof sections];
  if (!second) return [{ label: section.label }];

  if (first === "work") {
    const work = works.find((entry) => entry.id === second);
    return [section, { label: work?.title ?? title }];
  }

  // `/writing/page/2` names the page, not the list again.
  if (first === "writing" && second === "page") {
    return [
      section,
      { label: ui.writing.pageLabel[locale](Number(third) || 1) },
    ];
  }

  // A post (`/writing/<slug>`) carries its headline; a tag page carries
  // `Tag: <label>`, which is the page's own title.
  return [section, { label: title }];
}
