import { ArrowUpRight } from "lucide-react";

import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";

const trackLayer = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
  },
  { label: "music.dabaz.me", href: "https://music.dabaz.me" },
];

export default function Sound() {
  return (
    <Container id="sound" className="scroll-mt-20 py-24">
      <SectionHeader index="03" label="Sound" />
      <div className="mt-10 font-mono text-sm leading-7 text-muted">
        <p>{"> ambient engine ......... offline (warming up)"}</p>
        <p>{"> track layer ............ linked"}</p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-3">
        {trackLayer.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              {label}
              <ArrowUpRight className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-lg font-mono text-sm leading-6 text-muted">
        real releases live on the platforms above — a generative ambient
        engine takes over this section in the next pass.
      </p>
    </Container>
  );
}
