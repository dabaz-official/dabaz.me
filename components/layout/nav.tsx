import Link from "next/link";

import SoundToggle from "@dabaz/components/audio/sound-toggle";
import Container from "@dabaz/components/layout/container";
import ThemeToggle from "@dabaz/components/layout/theme-toggle";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Sound", href: "/#sound" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          DABAZ<span className="text-fg dark:text-accent">_</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
