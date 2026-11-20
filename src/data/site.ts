import type { Localized } from "../lib/i18n";

/**
 * Site identity. The only place the site names itself.
 *
 * `name`, `url`, and `email` are facts and stay plain strings. `role` and
 * `description` are copy, so they are `Localized`; a new locale cannot ship
 * with an English description silently.
 */
const site = {
  name: "DabAZ",
  url: "https://dabaz.me",
  email: "hi@dabaz.me",
  role: {
    en: "Forward Deployed Engineer",
    zh: "前沿部署工程师",
  } satisfies Localized,
  description: {
    en: "Frontend engineer and designer building things that make noise — in code, in sound and in pixels.",
    zh: "前端工程师与设计师， 在代码、 声音与像素之间制造噪音。",
  } satisfies Localized,
} as const;

export default site;
