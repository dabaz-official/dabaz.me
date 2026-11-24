import { htmlLang, type Locale } from "../lib/i18n";

/** DESIGN.md §10 `Social`. */
export type Social = {
  label: string;
  /** The label a zh page shows when the word is not a proper noun. */
  zh?: string;
  href: string;
};

/**
 * A profile label as a page shows it, and the language that label is in.
 * `CV` is the one entry whose word translates, so a zh page reads 简历; every
 * other label is a proper noun and keeps `lang="en"` on both locales.
 */
export function socialLabel(link: Social, locale: Locale) {
  if (locale === "zh" && link.zh) {
    return { label: link.zh, lang: htmlLang(locale) };
  }
  return { label: link.label, lang: "en" };
}

/**
 * Contact and profile links. `primary` is the short set the footer and hero
 * may show; `all` is available to thread 2, which decides what renders.
 */
const social: { primary: Social[]; all: Social[] } = {
  primary: [
    { label: "Email", href: "mailto:hi@dabaz.me" },
    { label: "X", href: "https://x.com/dabaz_official" },
    { label: "GitHub", href: "https://github.com/dabaz-official" },
    { label: "CV", zh: "简历", href: "https://cv.dabaz.me" },
  ],
  all: [
    { label: "Email", href: "mailto:hi@dabaz.me" },
    { label: "X", href: "https://x.com/dabaz_official" },
    { label: "GitHub", href: "https://github.com/dabaz-official" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/diebold-dai/" },
    { label: "Instagram", href: "https://www.instagram.com/dabaz_official" },
    { label: "TikTok", href: "https://www.tiktok.com/@dabaz_official" },
    { label: "YouTube", href: "https://www.youtube.com/@dabaz_official" },
    {
      label: "Spotify",
      href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
    },
    { label: "Threads", href: "https://www.threads.net/@dabaz_official" },
    { label: "DabMusic", href: "https://music.dabaz.me" },
    { label: "CV", zh: "简历", href: "https://cv.dabaz.me" },
  ],
};

/**
 * The profiles that belong on a contact card, in order. YouTube and Spotify
 * live in the music section instead, so they are not part of this list.
 */
export const contactLabels = [
  "X",
  "GitHub",
  "LinkedIn",
  "Instagram",
  "TikTok",
  "Threads",
  "CV",
];

export default social;
