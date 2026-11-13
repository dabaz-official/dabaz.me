import Link from "next/link";

import Container from "@dabaz/components/layout/container";
import copyByLocale from "@dabaz/data/copy";
import site, { type Locale } from "@dabaz/data/site";

export default function NotFoundView({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">{copy.notFound.label}</p>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-6xl">
        {copy.notFound.title}
        <span className="text-accent">_</span>
      </h1>
      <Link
        href={site.locales[locale].path}
        className="mt-8 font-mono text-sm text-fg underline underline-offset-4 transition-colors hover:text-muted"
      >
        {copy.notFound.back}
      </Link>
    </Container>
  );
}
