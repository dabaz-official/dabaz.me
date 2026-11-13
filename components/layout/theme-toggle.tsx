"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span aria-hidden className="inline-flex size-8 border border-line" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? copy.toggles.light : copy.toggles.dark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-8 items-center justify-center border border-line text-fg transition-colors hover:bg-accent hover:text-accent-ink"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
