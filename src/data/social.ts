/** DESIGN.md §10 `Social`. */
export type Social = { label: string; href: string };

/**
 * Contact and profile links. `primary` is the short set the footer and hero
 * may show; `all` is available to thread 2, which decides what renders.
 */
const social: { primary: Social[]; all: Social[] } = {
  primary: [
    { label: "Email", href: "mailto:hi@dabaz.me" },
    { label: "X", href: "https://x.com/dabaz_official" },
    { label: "GitHub", href: "https://github.com/dabaz-official" },
    { label: "CV", href: "https://cv.dabaz.me" },
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
    { label: "CV", href: "https://cv.dabaz.me" },
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
