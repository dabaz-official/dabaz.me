"use client";

import { useEffect, useState } from "react";

const BOOT_KEY = "dabaz-boot-v1";

const BOOT_LINES: { text: string; tone: "muted" | "accent" | "fg" }[] = [
  { text: "DABAZ BIOS v27.0.0", tone: "fg" },
  { text: "> memory ................. ok", tone: "muted" },
  { text: "> design tokens .......... loaded", tone: "muted" },
  { text: "> fonts .................. clash / general-sans / geist-mono", tone: "muted" },
  { text: "> audio engine ........... standby", tone: "muted" },
  { text: "> identity ............... hacker.musician.designer.developer", tone: "accent" },
  { text: "", tone: "muted" },
  { text: "$ whoami", tone: "fg" },
];

/**
 * First-visit boot screen. Skipped by any key/click, replayed never
 * (localStorage), and disabled entirely under prefers-reduced-motion.
 */
export default function BootSequence() {
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
        {BOOT_LINES.map((line, i) => (
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
            {i === BOOT_LINES.length - 1 && (
              <span className="boot-cursor text-accent">▮</span>
            )}
          </p>
        ))}
      </div>
      <p className="mt-10 font-mono text-[10px] text-muted">
        [ click or press any key to skip ]
      </p>
    </div>
  );
}
