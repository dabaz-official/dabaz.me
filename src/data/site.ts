/**
 * Site identity. The only place the site names itself.
 *
 * `role` and `description` are English strings for now: thread 4 replaces them
 * with `Localized` records when it introduces `/zh`. Thread 2 owns profile copy.
 */
const site = {
  name: "DabAZ",
  url: "https://dabaz.me",
  email: "hi@dabaz.me",
  role: "Frontend engineer & UI designer",
  description:
    "Frontend engineer and designer building things that make noise — in code, in sound and in pixels.",
} as const;

export default site;
