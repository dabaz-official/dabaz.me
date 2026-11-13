export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const name = "DabAZ";

const site = {
  name,
  url: "https://dabaz.me",
  email: "hi@dabaz.me",
  theme: {
    light: "#f4f1ea",
    dark: "#0a0a0b",
  },
  locales: {
    en: {
      lang: "en",
      ogLocale: "en_US",
      hreflang: "en",
      path: "/",
      pageTitle: "Frontend engineer & UI designer",
      tagline: "hacker · musician · designer · developer",
      description:
        "Frontend engineer and designer building things that make noise — in code, in sound and in pixels. Hacker, musician, designer, developer.",
    },
    zh: {
      lang: "zh-CN",
      ogLocale: "zh_CN",
      hreflang: "zh-CN",
      path: "/zh",
      pageTitle: "前端工程师兼 UI 设计师",
      tagline: "黑客、 音乐人、 设计师、 开发者",
      description:
        "前端工程师兼设计师， 本职写代码， 也做音乐与视觉。 黑客、 音乐人、 设计师、 开发者——在代码、 声音与像素之间制造噪音。 这里收录作品、 声音实验和联系方式。",
    },
  },
} as const;

export type SiteLocale = (typeof site.locales)[Locale];

export default site;
