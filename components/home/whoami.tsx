import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";
import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

export default function Whoami({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <Container id="whoami" className="scroll-mt-24 pb-0 pt-16">
      <SectionHeader index="01" label={copy.whoami.label} />
      <p className="mt-8 max-w-[65ch] text-lg leading-8">
        {copy.whoami.summary}
      </p>
      <dl className="mt-10 border-t border-line">
        {copy.whoami.identities.map(({ name, line }) => (
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
