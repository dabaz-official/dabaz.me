import { Mail } from 'lucide-react';

import { GitHub, Instagram, LinkedIn, Spotify, TikTok, X, YouTube } from '@dabaz/components/icons';

const social = {
  hero: [
    { href: "mailto:hi@dabaz.me", key: "Email", Icon: Mail },
    { href: "https://x.com/dabaz_official", key: "X", Icon: X, target: "_blank" },
    { href: "https://github.com/dabaz-official", key: "GitHub", Icon: GitHub, target: "_blank" },
  ],
  footer: [
    { href: "mailto:hi@dabaz.me", key: "Email", Icon: Mail },
    { href: "https://www.x.com/dabaz_official", key: "X", Icon: X, target: "_blank" },
    { href: "https://www.github.com/dabaz-official", key: "GitHub", Icon: GitHub, target: "_blank" },
    { href: "https://www.linkedin.com/in/diebold-dai/", key: "LinkedIn", Icon: LinkedIn, target: "_blank" },
    { href: "https://www.instagram.com/dabaz_official", key: "Instagram", Icon: Instagram, target: "_blank" },
    { href: "https://www.tiktok.com/@dabaz_official", key: "TikTok", Icon: TikTok, target: "_blank" },
    { href: "https://www.youtube.com/@dabaz_official", key: "YouTube", Icon: YouTube, target: "_blank" },
    { href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ", key: "Spotify", Icon: Spotify, target: "_blank" },
  ]
}

export default social;