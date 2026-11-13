"use client";

import { useSound } from "@dabaz/components/audio/sound-provider";
import copyByLocale from "@dabaz/data/copy";
import type { Locale } from "@dabaz/data/site";

export default function AmbientStatus({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const { playing } = useSound();

  return (
    <p>
      {playing ? copy.sound.statusOnline : copy.sound.statusStandby}
    </p>
  );
}
