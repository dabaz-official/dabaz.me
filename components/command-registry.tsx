"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useSound } from "@dabaz/components/audio/sound-provider";
import copyByLocale from "@dabaz/data/copy";
import site, { type Locale } from "@dabaz/data/site";

export type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

/** The single command registry shared by the ⌘K palette and the terminal bar. */
export function useCommands(locale: Locale): Command[] {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { playing, toggle } = useSound();
  const copy = copyByLocale[locale];
  const home = site.locales[locale].path;

  return useMemo(
    () => [
      {
        id: "home",
        label: "cd ~",
        hint: copy.commands.home,
        run: () => router.push(home),
      },
      {
        id: "work",
        label: "ls work",
        hint: copy.commands.work,
        run: () => router.push(`${home}#work`),
      },
      {
        id: "sound-section",
        label: "cd sound",
        hint: copy.commands.sound,
        run: () => router.push(`${home}#sound`),
      },
      {
        id: "cv",
        label: "cat cv",
        hint: copy.commands.cv,
        run: () => window.open("https://cv.dabaz.me", "_blank"),
      },
      {
        id: "contact",
        label: "open contact",
        hint: copy.commands.contact,
        run: () => router.push(`${home}#contact`),
      },
      {
        id: "theme",
        label: "sudo dark-mode",
        hint: copy.commands.theme,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "audio",
        label: "engine --toggle",
        hint: playing ? copy.commands.audioOn : copy.commands.audioOff,
        run: () => toggle(),
      },
      {
        id: "hire",
        label: "sudo hire-me",
        hint: copy.commands.hire,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "github",
        label: "open github",
        hint: copy.commands.github,
        run: () => window.open("https://github.com/dabaz-official", "_blank"),
      },
      {
        id: "spotify",
        label: "open spotify",
        hint: copy.commands.spotify,
        run: () =>
          window.open(
            "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
            "_blank",
          ),
      },
    ],
    [router, resolvedTheme, setTheme, playing, toggle, copy, home],
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
