"use client";

import { VolumeX } from "lucide-react";
import { useSound } from "@dabaz/components/audio/sound-provider";
import Visualizer from "@dabaz/components/audio/visualizer";
import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

export default function SoundToggle({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const { playing, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? copy.toggles.soundOn : copy.toggles.soundOff}
      aria-pressed={playing}
      className="inline-flex size-8 items-center justify-center border border-line text-fg transition-colors hover:bg-accent hover:text-accent-ink"
    >
      {playing ? (
        <Visualizer variant="mini" className="size-3.5" />
      ) : (
        <VolumeX className="size-4" />
      )}
    </button>
  );
}
