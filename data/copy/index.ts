import type { Locale } from "@dabaz/data/site";

import en from "./en";
import zh from "./zh";

export type Copy = typeof en;

const copy: Record<Locale, Copy> = { en, zh };

export default copy;
