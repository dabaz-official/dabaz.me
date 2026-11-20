/**
 * Music: where the catalogue lives, and the three latest releases.
 *
 * Releases carry real dates from the platforms they were published on, so the
 * page can sort and format them instead of hard-coding display strings.
 * SoundCloud exposes no dates in its HTML, so nothing here depends on it for
 * ordering.
 */
import type { ImageMetadata } from "astro";

import type { Localized } from "../lib/i18n";
import athanasia from "../assets/music/athanasia.jpg";
import slagb from "../assets/music/slagb-freestyle-2.jpg";
import whatWeLeft from "../assets/music/what-we-left-behind.jpg";

export type Platform = { label: string; href: string };

export type Release = {
  title: string;
  kind: "Track" | "Single" | "Album";
  /** ISO date from the platform. */
  date: string;
  platform: string;
  href: string;
  cover: ImageMetadata;
};

export const platforms: Platform[] = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1KmtWPNNBJw4spLrQkPrXQ",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/dabaz/440893304",
  },
  { label: "YouTube", href: "https://www.youtube.com/@dabaz_official" },
  { label: "Bandcamp", href: "https://dabaz.bandcamp.com" },
  { label: "SoundCloud", href: "https://soundcloud.com/dabaz_official" },
];

export const ownPlayer = {
  label: "DabMusic",
  href: "https://music.dabaz.me",
  note: {
    en: "Unreleased tracks and new releases, in a player I built.",
    zh: "未发布的曲目和新作， 都在我自建的播放器里。",
  } satisfies Localized,
};

export const releases: Release[] = [
  {
    title: "what we left behind",
    kind: "Track",
    date: "2025-11-03",
    platform: "Bandcamp",
    href: "https://dabaz.bandcamp.com/track/what-we-left-behind",
    cover: whatWeLeft,
  },
  {
    title: "SLAGB FREESTYLE 2",
    kind: "Track",
    date: "2023-08-25",
    platform: "Bandcamp",
    href: "https://dabaz.bandcamp.com/track/slagb-freestyle-2",
    cover: slagb,
  },
  {
    title: "Athanasia",
    kind: "Single",
    date: "2022-05-13",
    platform: "Apple Music",
    href: "https://music.apple.com/us/album/athanasia-single/1626035519",
    cover: athanasia,
  },
];
