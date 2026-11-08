"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useSound } from "@dabaz/components/audio/sound-provider";

export default function SoundToggle() {
  const { playing, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute ambient sound" : "Unmute ambient sound"}
      aria-pressed={playing}
      className="inline-flex size-8 items-center justify-center border border-line text-fg transition-colors hover:bg-accent hover:text-accent-ink"
    >
      {playing ? (
        <Volume2 className="size-4" />
      ) : (
        <VolumeX className="size-4" />
      )}
    </button>
  );
}
