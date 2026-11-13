import type { Metadata } from "next";
import Link from "next/link";

import Container from "@dabaz/components/layout/container";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">404 — segment not found</p>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-6xl">
        Nothing here<span className="text-accent">_</span>
      </h1>
      <Link
        href="/"
        className="mt-8 font-mono text-sm text-fg underline underline-offset-4 transition-colors hover:text-muted"
      >
        cd ~/
      </Link>
    </Container>
  );
}
