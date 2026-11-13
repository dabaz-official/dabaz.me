import Link from "next/link";

import Container from "@dabaz/components/layout/container";
import copyByLocale from "@dabaz/data/copy";
import social from "@dabaz/data/social";
import site, { type Locale } from "@dabaz/data/site";

const linkClass =
  "font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg";

export default function Footer({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const home = site.locales[locale].path;
  const navLinks = [
    { label: copy.nav.work, href: `${home}#work` },
    { label: copy.nav.sound, href: `${home}#sound` },
    { label: copy.nav.cv, href: "https://cv.dabaz.me", external: true },
  ];

  return (
    <footer className="site-footer">
      <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
          {navLinks.map((link) => (
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
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
          {social.primary.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className={linkClass}>
                {href.startsWith("mailto:") ? copy.social.email : label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
