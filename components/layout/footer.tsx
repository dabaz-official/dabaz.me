import Link from "next/link";

import Container from "@dabaz/components/layout/container";
import social from "@dabaz/data/social";
import site from "@dabaz/data/site";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Sound", href: "/#sound" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
          {social.primary.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
