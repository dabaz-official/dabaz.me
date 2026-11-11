"use client";

import { useEffect } from "react";

/** Leaves a signature for everyone who opens devtools. */
export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%cDABAZ_%c v27.0.0 — rebuilt from scratch",
      "color:#b8ff29;font-weight:bold;font-family:monospace",
      "color:inherit",
    );
    console.log(
      "%c> you opened the console. hacker verified.",
      "font-family:monospace;color:#82827d",
    );
    console.log(
      "%c> try \u2318K — this site takes commands.",
      "font-family:monospace;color:#82827d",
    );
  }, []);
  return null;
}
