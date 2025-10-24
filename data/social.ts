import { Mail } from 'lucide-react';

import { GitHub, Instagram, LinkedIn, Spotify, TikTok, X, YouTube } from '@dabaz/components/icons';

const social = {
  hero: [
    { href: "mailto:hi@dabaz.me", label: "Email", Icon: Mail },
    { href: "https://x.com/dabaz_official", label: "X", Icon: X, target: "_blank" },
    { href: "https://github.com/dabaz-official", label: "GitHub", Icon: GitHub, target: "_blank" },
  ],
  footer: [
    { href: "mailto:hi@dabaz.me", label: "Email", Icon: Mail },
    { href: "https://www.x.com/dabaz_official", label: "X", Icon: X, target: "_blank" },
    { href: "https://www.github.com/dabaz-official", label: "GitHub", Icon: GitHub, target: "_blank" },
    { href: "https://www.linkedin.com/in/diebold-dai/", label: "LinkedIn", Icon: LinkedIn, target: "_blank" },
    { href: "https://www.instagram.com/dabaz_official", label: "Instagram", Icon: Instagram, target: "_blank" },
    { href: "https://www.tiktok.com/@dabaz_official", label: "TikTok", Icon: TikTok, target: "_blank" },
    { href: "https://www.youtube.com/@dabaz_official", label: "YouTube", Icon: YouTube, target: "_blank" },
    { href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ", label: "Spotify", Icon: Spotify, target: "_blank" },
  ]
}

export default social;