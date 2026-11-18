import { ArrowUpRight } from "lucide-react";

import Visualizer from "@dabaz/components/audio/visualizer";
import AmbientStatus from "@dabaz/components/home/ambient-status";
import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";
import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

const trackLayer = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
  },
  { label: "music.dabaz.me", href: "https://music.dabaz.me" },
];

export default function Sound({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <Container id="sound" className="scroll-mt-24 pb-16 pt-24">
      <SectionHeader index="03" label={copy.sound.label} />
      <div className="mt-8 font-mono text-sm leading-7 text-muted">
        <AmbientStatus locale={locale} />
        <p>{copy.sound.trackLayer}</p>
      </div>
      <Visualizer
        variant="spectrum"
        className="mt-6 h-12 w-full max-w-sm text-muted"
      />
      <ul className="mt-6 flex flex-wrap gap-3">
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
      <p className="mt-6 max-w-[65ch] text-sm leading-6 text-muted">
        {copy.sound.description}
      </p>
    </Container>
  );
}
