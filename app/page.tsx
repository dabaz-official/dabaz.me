import Container from "@dabaz/components/layout/container";

const bootLines = [
  "design tokens ......... loaded",
  "clash display ......... loaded",
  "general sans .......... loaded",
  "geist mono ............ loaded",
  "dual-mode ............. ready",
];

export default function HomePage() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">$ boot --profile dabaz</p>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-6xl">
        P1 foundation online<span className="text-accent">_</span>
      </h1>
      <pre className="mt-8 font-mono text-xs leading-6 text-muted sm:text-sm">
        {bootLines.join("\n")}
      </pre>
      <p className="mt-8 max-w-md font-mono text-sm leading-6 text-muted">
        sections arrive in P2 — whoami / work / sound / contact
      </p>
    </Container>
  );
}
