"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useSound } from "@dabaz/components/audio/sound-provider";
import site from "@dabaz/data/site";

export type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

/** The single command registry shared by the ⌘K palette and the terminal bar. */
export function useCommands(): Command[] {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { playing, toggle } = useSound();

  return useMemo(
    () => [
      {
        id: "home",
        label: "cd ~",
        hint: "go home",
        run: () => router.push("/"),
      },
      {
        id: "work",
        label: "ls work",
        hint: "see projects",
        run: () => router.push("/#work"),
      },
      {
        id: "sound-section",
        label: "cd sound",
        hint: "audio section",
        run: () => router.push("/#sound"),
      },
      {
        id: "cv",
        label: "cat cv",
        hint: "resume page",
        run: () => router.push("/cv"),
      },
      {
        id: "contact",
        label: "open contact",
        hint: "say hi",
        run: () => router.push("/#contact"),
      },
      {
        id: "theme",
        label: "sudo dark-mode",
        hint: "toggle theme",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "audio",
        label: "engine --toggle",
        hint: playing ? "mute ambient engine" : "arm ambient engine",
        run: () => toggle(),
      },
      {
        id: "hire",
        label: "sudo hire-me",
        hint: "open mail client",
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "github",
        label: "open github",
        hint: "@dabaz-official",
        run: () => window.open("https://github.com/dabaz-official", "_blank"),
      },
      {
        id: "spotify",
        label: "open spotify",
        hint: "artist page",
        run: () =>
          window.open(
            "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
            "_blank",
          ),
      },
    ],
    [router, resolvedTheme, setTheme, playing, toggle],
  );
}

export function filterCommands(
  commands: Command[],
  query: string,
): Command[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;
  return commands.filter((c) =>
    `${c.label} ${c.hint}`.toLowerCase().includes(q),
  );
}
