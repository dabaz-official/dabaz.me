import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";

const identities = [
  { name: "Hacker", line: "Breaks and bends things until they make sense" },
  { name: "Musician", line: "Synths, unreleased tracks and sound design" },
  { name: "Designer", line: "Typography, grids and pixels with intent" },
  { name: "Developer", line: "Ships interfaces that stay fast" },
];

export default function Whoami() {
  return (
    <Container id="whoami" className="scroll-mt-24 pb-0 pt-16">
      <SectionHeader index="01" label="Whoami" />
      <p className="mt-8 max-w-[65ch] text-lg leading-8">
        Frontend engineer by trade, hacker by instinct, musician by
        obsession, designer by necessity. I build interfaces, compose
        systems, and make noise on both sides of the frequency spectrum.
      </p>
      <dl className="mt-10 border-t border-line">
        {identities.map(({ name, line }) => (
          <div
            key={name}
            className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <dt className="w-24 shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
              {name}
            </dt>
            <dd className="font-mono text-sm">{line}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
