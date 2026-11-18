"use client";

import { useEffect, useState } from "react";

import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

const BOOT_KEY = "dabaz-boot-v1";

const BOOT_TONES: ("fg" | "muted" | "accent")[] = [
  "fg",
  "muted",
  "muted",
  "muted",
  "muted",
  "accent",
  "muted",
  "fg",
];

/**
 * First-visit boot screen. Skipped by any key/click, replayed never
 * (localStorage), and disabled entirely under prefers-reduced-motion.
 */
export default function BootSequence({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const bootLines = copy.boot.lines.map((text, i) => ({
    text,
    tone: BOOT_TONES[i] ?? "muted",
  }));
  const [state, setState] = useState<"hidden" | "show" | "fading">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.localStorage.getItem(BOOT_KEY)) return;
    window.localStorage.setItem(BOOT_KEY, "1");

    setState("show");
    const total = setTimeout(() => setState("fading"), 2100);
    const skip = () => setState("fading");
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(total);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (state !== "fading") return;
    const t = setTimeout(() => setState("hidden"), 450);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div
      role="presentation"
      onClick={() => setState("fading")}
      className={`fixed inset-0 z-[200] flex cursor-pointer flex-col items-start justify-center bg-bg px-8 transition-opacity duration-400 sm:px-16 ${
        state === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-xs leading-6 sm:text-sm sm:leading-7">
        {bootLines.map((line, i) => (
          <p
            key={i}
            className={`boot-line opacity-0 ${
              line.tone === "accent"
                ? "text-accent"
                : line.tone === "fg"
                  ? "text-fg"
                  : "text-muted"
            }`}
            style={{ animationDelay: `${i * 190}ms` }}
          >
            {line.text || "\u00A0"}
            {i === bootLines.length - 1 && (
              <span className="boot-cursor text-accent">▮</span>
            )}
          </p>
        ))}
      </div>
      <p className="mt-10 font-mono text-[10px] text-muted">
        {copy.boot.skip}
      </p>
    </div>
  );
}
