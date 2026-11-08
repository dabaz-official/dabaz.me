import Container from "@dabaz/components/layout/container";
import ScrambleText from "@dabaz/components/scramble-text";

const identities = ["Hacker", "Musician", "Designer", "Developer"];

export default function Hero() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">$ whoami --profile dabaz</p>
      <h1 className="mt-8">
        {identities.map((identity, i) => (
          <span
            key={identity}
            className="block w-fit font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight transition-colors hover:bg-accent hover:text-accent-ink sm:text-7xl"
          >
            <ScrambleText text={identity} delay={i * 160} />
          </span>
        ))}
      </h1>
      <p className="mt-10 max-w-lg font-mono text-sm leading-6 text-muted sm:text-base sm:leading-7">
        {"> building things that make noise — in code, in sound, in pixels."}
      </p>
      <p className="mt-16 font-mono text-xs text-muted">[ scroll ↓ ]</p>
    </Container>
  );
}
