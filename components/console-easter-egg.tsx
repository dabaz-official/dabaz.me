"use client";

import { useEffect } from "react";

import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

/** Leaves a signature for everyone who opens devtools. */
export default function ConsoleEasterEgg({ locale }: { locale: Locale }) {
  const { signature, opened, hint } = copyByLocale[locale].console;

  useEffect(() => {
    console.log(
      "%c" + signature,
      "color:#b8ff29;font-weight:bold;font-family:monospace",
      "color:inherit",
    );
    console.log("%c" + opened, "font-family:monospace;color:#82827d");
    console.log("%c" + hint, "font-family:monospace;color:#82827d");
  }, [signature, opened, hint]);
  return null;
}
