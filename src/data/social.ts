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
  ],
};

export default social;
