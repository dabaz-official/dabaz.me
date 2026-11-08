import Container from "@dabaz/components/layout/container";
import social from "@dabaz/data/social";
import site from "@dabaz/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
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
        <p className="font-mono text-xs text-muted">
          v27.0.0 — rebuilt from scratch
        </p>
      </Container>
    </footer>
  );
}
