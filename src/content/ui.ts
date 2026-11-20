import type { Localized } from "../lib/i18n";

/**
 * Interface copy — every string the shell and the shared components render.
 *
 * This is the extraction seam: a component never writes a visible or spoken
 * string of its own, it reads `ui.<group>.<name>[locale]`. Content records keep
 * their own copy in the collections and in `profile.ts`; proper nouns (the
 * site name, work and release titles, platform and social labels) stay plain
 * strings.
 *
 * Chinese copy follows DabFonts TYPESETTING.md §3: Chinese codepoints, and one
 * U+0020 after every sentence mark or closing mark that is followed by text.
 * `scripts/check-copy.mjs` enforces that in this file and in `src/data/`.
 *
 * To add a locale: extend `locales` in `src/lib/i18n.ts`; TypeScript then
 * fails every branch of this object and of `profile.ts` until the new locale
 * is filled in — there is no silent English fallback.
 */
export type MusicKind = "Track" | "Single" | "Album";

export interface UiCopy {
  skipToContent: Localized;
  primaryNav: Localized;
  nav: {
    work: Localized;
    music: Localized;
    blog: Localized;
    contact: Localized;
  };
  home: {
    portrait: Localized;
    scrollDown: Localized;
    logo: Localized<(name: string) => string>;
  };
  music: {
    streaming: Localized;
    ownPlayer: Localized;
    latest: Localized;
    kinds: Record<MusicKind, Localized>;
  };
  writing: {
    title: Localized;
    all: Localized;
    empty: Localized;
    newer: Localized;
    older: Localized;
    pagination: Localized;
    postNav: Localized;
    tagPrefix: Localized;
    tagTitle: Localized<(label: string) => string>;
    tagDescription: Localized<(label: string) => string>;
    pageTitle: Localized<(page: number) => string>;
  };
  footer: {
    writing: Localized;
    rss: Localized;
    /** The target language's own name, shown by the switch. */
    languageName: Localized;
  };
}

const ui: UiCopy = {
  skipToContent: { en: "Skip to content", zh: "跳到正文" },
  primaryNav: { en: "Primary", zh: "主导航" },
  nav: {
    work: { en: "Work", zh: "作品" },
    music: { en: "Music", zh: "音乐" },
    blog: { en: "Blog", zh: "博客" },
    contact: { en: "Contact", zh: "联系" },
  },
  home: {
    portrait: { en: "Portrait", zh: "肖像" },
    scrollDown: { en: "Scroll down", zh: "向下滚动" },
    logo: {
      en: (name) => `${name} — home`,
      zh: (name) => `${name} 首页`,
    },
  },
  music: {
    streaming: { en: "Streaming", zh: "流媒体" },
    ownPlayer: { en: "Own player", zh: "自建播放器" },
    latest: { en: "Latest", zh: "最新" },
    kinds: {
      Track: { en: "Track", zh: "曲目" },
      Single: { en: "Single", zh: "单曲" },
      Album: { en: "Album", zh: "专辑" },
    },
  },
  writing: {
    title: { en: "Writing", zh: "写作" },
    all: { en: "All writing", zh: "全部文章" },
    empty: { en: "No posts yet.", zh: "暂无文章。" },
    newer: { en: "Newer posts", zh: "较新的文章" },
    older: { en: "Older posts", zh: "更早的文章" },
    pagination: { en: "Pagination", zh: "分页" },
    postNav: { en: "Writing", zh: "写作" },
    tagPrefix: { en: "Tag:", zh: "标签：" },
    tagTitle: {
      en: (label) => `Tag: ${label}`,
      zh: (label) => `标签： ${label}`,
    },
    tagDescription: {
      en: (label) => `Posts tagged ${label}.`,
      zh: (label) => `带有 ${label} 标签的文章。`,
    },
    pageTitle: {
      en: (page) => `Writing — page ${page}`,
      zh: (page) => `写作——第 ${page} 页`,
    },
  },
  footer: {
    writing: { en: "Writing", zh: "写作" },
    rss: { en: "RSS", zh: "RSS" },
    languageName: { en: "English", zh: "中文" },
  },
};

export default ui;
