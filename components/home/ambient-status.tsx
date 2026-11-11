"use client";

import { useSound } from "@dabaz/components/audio/sound-provider";

export default function AmbientStatus() {
  const { playing } = useSound();

  return (
    <p>
      {playing
        ? "> ambient engine ......... online"
        : "> ambient engine ......... standby — arm it from the header toggle"}
    </p>
  );
}
