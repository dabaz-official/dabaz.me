const name = "DabAZ";
const pageTitle = "Frontend engineer & UI designer";

const site = {
  name,
  pageTitle,
  title: `${pageTitle} — ${name}`,
  tagline: "hacker · musician · designer · developer",
  description:
    "Frontend engineer and designer building things that make noise — in code, in sound and in pixels. Hacker, musician, designer, developer.",
  url: "https://dabaz.me",
  email: "hi@dabaz.me",
  locale: "en",
  ogLocale: "en_US",
  theme: {
    light: "#f4f1ea",
    dark: "#0a0a0b",
  },
} as const;

export default site;
