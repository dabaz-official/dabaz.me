import Container from "@dabaz/components/layout/container";
import ScrambleText from "@dabaz/components/scramble-text";
import copyByLocale from "@dabaz/data/copy";
import site, { type Locale } from "@dabaz/data/site";
import social from "@dabaz/data/social";

const contactLinks = [...social.primary, ...social.all];

export default function Hero({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <Container className="pb-0 pt-16">
      <p className="font-mono text-sm text-muted">{copy.hero.prompt}</p>
      <p className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        <ScrambleText text={site.name} />
      </p>
      <h1 className="mt-4 text-xl font-medium sm:text-2xl">
        {site.locales[locale].pageTitle}
      </h1>
      <p className="mt-4 max-w-[65ch] text-base leading-7 text-muted">
        {copy.hero.intro}
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
        {contactLinks.map(({ label, href }) => {
          const external = href.startsWith("http");
          const text = href.startsWith("mailto:") ? copy.social.email : label;
          return (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
