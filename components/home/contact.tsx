import { ArrowUpRight } from "lucide-react";

import ScrambleText from "@dabaz/components/scramble-text";
import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";
import social from "@dabaz/data/social";
import site from "@dabaz/data/site";

export default function Contact() {
  return (
    <Container id="contact" className="scroll-mt-20 py-24">
      <SectionHeader index="04" label="Contact" />
      <p className="mt-10 font-display text-4xl font-semibold sm:text-6xl">
        <ScrambleText
          text={"Let's build something loud"}
          trigger="in-view"
          duration={1100}
        />
        <span className="text-fg dark:text-accent">_</span>
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-8 inline-flex font-mono text-xl underline underline-offset-8 transition-colors hover:text-muted sm:text-2xl"
      >
        {site.email}
      </a>
      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
        {social.all.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
            >
              {label}
              <ArrowUpRight className="size-3" />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
