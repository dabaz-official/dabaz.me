import Link from "next/link";

import SoundToggle from "@dabaz/components/audio/sound-toggle";
import Container from "@dabaz/components/layout/container";
import ThemeToggle from "@dabaz/components/layout/theme-toggle";
import copyByLocale from "@dabaz/data/copy";
import site, { type Locale } from "@dabaz/data/site";

const linkClass =
  "font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg";

export default function Nav({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const home = site.locales[locale].path;
  const links = [
    { label: copy.nav.work, href: `${home}#work` },
    { label: copy.nav.sound, href: `${home}#sound` },
    { label: copy.nav.cv, href: "https://cv.dabaz.me", external: true },
  ];

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href={home}
          className="font-display text-lg font-semibold tracking-tight"
        >
          {site.name}
          <span className="text-fg dark:text-accent">_</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <SoundToggle locale={locale} />
            <ThemeToggle locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
