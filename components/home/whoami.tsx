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
    <Container id="whoami" className="scroll-mt-20 py-24">
      <SectionHeader index="01" label="Whoami" />
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <p className="text-xl leading-8 sm:text-2xl sm:leading-9">
          Frontend engineer by trade, hacker by instinct, musician by
          obsession, designer by necessity. I build interfaces, compose
          systems, and make noise on both sides of the frequency spectrum.
        </p>
        <ul className="flex flex-col gap-5">
          {identities.map(({ name, line }) => (
            <li key={name} className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                {name}
              </span>
              <span className="font-mono text-sm">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
