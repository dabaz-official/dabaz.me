import type { Metadata } from "next";
import Link from "next/link";

import Container from "@dabaz/components/layout/container";

export const metadata: Metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">$ cat cv.pdf</p>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-6xl">
        CV loading<span className="text-fg dark:text-accent">_</span>
      </h1>
      <p className="mt-6 max-w-md font-mono text-sm leading-6 text-muted">
        the pdf embed lands here in a later pass — meanwhile, ask me directly.
      </p>
      <Link
        href="/#contact"
        className="mt-8 w-fit font-mono text-sm underline underline-offset-4 transition-colors hover:text-muted"
      >
        → /#contact
      </Link>
    </Container>
  );
}
