import type { Metadata } from "next";
import { ArrowUpRight, Download } from "lucide-react";

import Container from "@dabaz/components/layout/container";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Diebold Dai — frontend engineer & UI designer. Resume, April 2026.",
};

const CV_FILE = "/cv/Frontend-Resume-CN-Apr26.pdf";

const chipClass =
  "inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink";

export default function CvPage() {
  return (
    <Container className="flex-1 py-24">
      <p className="font-mono text-sm text-muted">$ cat cv.pdf</p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display text-4xl font-semibold sm:text-6xl">
          CV<span className="text-fg dark:text-accent">_</span>
        </h1>
        <div className="flex gap-3">
          <a href={CV_FILE} download className={chipClass}>
            download
            <Download className="size-3.5" />
          </a>
          <a
            href={CV_FILE}
            target="_blank"
            rel="noreferrer"
            className={chipClass}
          >
            open
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <p className="mt-4 font-mono text-sm text-muted">
        Diebold Dai — frontend engineer &amp; UI designer
      </p>
      <div className="mt-10 border border-line">
        <iframe
          src={CV_FILE}
          title="CV — Diebold Dai"
          className="h-[80vh] w-full"
        />
      </div>
      <p className="mt-4 font-mono text-xs text-muted">
        inline preview is blocked on some mobile browsers — use download above.
      </p>
    </Container>
  );
}
