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
    writing: Localized;
    contact: Localized;
  };
  home: {
    portrait: Localized;
    scrollDown: Localized;
    logo: Localized<(name: string) => string>;
  };
  work: {
    description: Localized;
    /** Accessible name of the home showcase's tab list. */
    showcaseLabel: Localized;
    /** Paddles that step the showcase's selection on narrow screens. */
    previousProjects: Localized;
    nextProjects: Localized;
    /** Accessible name of the medallion on a work screenshot. */
    caseStudy: Localized;
  };
  music: {
    description: Localized;
    streaming: Localized;
    ownPlayer: Localized;
    latest: Localized;
    kinds: Record<MusicKind, Localized>;
  };
  writing: {
    title: Localized;
    description: Localized;
    pageDescription: Localized<(page: number) => string>;
    all: Localized;
    viewAll: Localized;
    empty: Localized;
    newer: Localized;
    older: Localized;
    pagination: Localized;
    postNav: Localized;
    tagPrefix: Localized;
    tagTitle: Localized<(label: string) => string>;
    tagDescription: Localized<(label: string) => string>;
    pageTitle: Localized<(page: number) => string>;
    /** The footer trail's crumb for a paginated list page. */
    pageLabel: Localized<(page: number) => string>;
    /** Post actions: the X intent link and the copy-link button. */
    shareX: Localized;
    copyLink: Localized;
    copied: Localized;
    /** Heading of the share row that closes the article. */
    shareArticle: Localized;
    /** Heading of the post page's related-posts shelf, named for the author. */
    moreFrom: Localized<(name: string) => string>;
    /** The pill under the related shelf that opens the writing list. */
    readMore: Localized;
  };
  contact: {
    description: Localized;
  };
  notFound: {
    title: Localized;
    description: Localized;
    back: Localized;
  };
  footer: {
    rss: Localized;
    /** The target language's own name, shown by the switch. */
    languageName: Localized;
    /** Names the footer's link columns for assistive tech. */
    sitemap: Localized;
    /** Names the footer's breadcrumb trail for assistive tech. */
    breadcrumb: Localized;
  };
}

const ui: UiCopy = {
  skipToContent: { en: "Skip to content", zh: "跳到正文" },
  primaryNav: { en: "Primary", zh: "主导航" },
  nav: {
    work: { en: "Work", zh: "作品" },
    music: { en: "Music", zh: "音乐" },
    writing: { en: "Writing", zh: "写作" },
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
  work: {
    description: {
      en: "Shipped work by DabAZ: web apps, games, and tools built end to end, with the screenshots and the trade-offs behind each one.",
      zh: "DabAZ 的作品： 从网页应用到小游戏与工具， 每一件都从想法做到上线， 附上截图、 技术选择与背后的取舍， 以及仍在维护的部分。",
    },
    showcaseLabel: { en: "Projects", zh: "项目" },
    previousProjects: { en: "Previous project", zh: "上一个项目" },
    nextProjects: { en: "Next project", zh: "下一个项目" },
    caseStudy: { en: "Case study", zh: "案例研究" },
  },
  music: {
    description: {
      en: "Music by DabAZ: released tracks, singles, and albums on the major streaming platforms, plus DabMusic, the player built to host them.",
      zh: "DabAZ 的音乐： 在各大流媒体平台发布的曲目、 单曲与专辑， 从创作到上线都在这里， 以及为它们搭建的播放器 DabMusic。",
    },
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
    description: {
      en: "Notes on hardware, software, music, and the web: long-form writing by DabAZ about the things he builds, uses, and breaks in practice.",
      zh: "关于硬件、 软件、 音乐与网页的长文笔记， 记录我做过的东西、 正在做的事， 以及一路上学到的东西， 由 DabAZ 撰写。",
    },
    pageDescription: {
      en: (page) =>
        `Writing, page ${page}: the archive of long-form notes by DabAZ on hardware, software, music, and the web.`,
      zh: (page) => `写作——第 ${page} 页： DabAZ 的长文笔记归档。`,
    },
    all: { en: "All writing", zh: "全部文章" },
    shareX: { en: "Share on X", zh: "分享到 X" },
    copyLink: { en: "Copy link", zh: "复制链接" },
    copied: { en: "Copied", zh: "已复制" },
    shareArticle: { en: "Share article", zh: "分享文章" },
    moreFrom: {
      en: (name) => `More from ${name}`,
      zh: (name) => `${name} 的更多文章`,
    },
    readMore: { en: "Read more", zh: "阅读更多" },
    viewAll: { en: "View All", zh: "查看全部" },
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
      en: (label) =>
        `Posts tagged ${label} on dabaz.me: notes, teardowns and buying advice from the archive, newest first, with the receipts and the trade-offs left in.`,
      zh: (label) =>
        `带有 ${label} 标签的文章： 关于硬件、 软件与购买建议的笔记， 按时间倒序排列， 记录真实使用体验与取舍， 不做参数复读。`,
    },
    pageTitle: {
      en: (page) => `Writing - page ${page}`,
      zh: (page) => `写作 - 第 ${page} 页`,
    },
    pageLabel: {
      en: (page) => `Page ${page}`,
      zh: (page) => `第 ${page} 页`,
    },
  },
  contact: {
    description: {
      en: "Contact DabAZ by email, or find him on X, GitHub, LinkedIn, Instagram, TikTok, and Threads for work, collaborations, and questions.",
      zh: "联系 DabAZ： 发邮件， 或在 X、 GitHub、 LinkedIn、 Instagram、 TikTok 与 Threads 上找到他。 欢迎工作邀约、 合作与提问。",
    },
  },
  notFound: {
    title: { en: "Not found", zh: "页面不存在" },
    description: {
      en: "The page you asked for is not here.",
      zh: "你要找的页面不在这里。",
    },
    back: { en: "Back to Home", zh: "返回首页" },
  },
  footer: {
    rss: { en: "RSS", zh: "RSS" },
    sitemap: { en: "Site map", zh: "站点地图" },
    breadcrumb: { en: "Breadcrumb", zh: "当前位置" },
    languageName: { en: "English", zh: "中文" },
  },
};

export default ui;
