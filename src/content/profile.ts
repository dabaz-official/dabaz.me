import type { ImageMetadata } from "astro";
import portrait from "../assets/images/portrait.webp";
import type { Localized } from "../lib/i18n";
import site from "../data/site";

/**
 * Home copy — DESIGN.md §10 `Profile`, plus the labels the home page renders.
 *
 * Thread 4 extracted the interface strings into `src/content/ui.ts`; this
 * module keeps only the owner's copy. Every field is `Localized`, so a new
 * locale fails the build here instead of falling back to English.
 *
 * Chinese copy follows DabFonts TYPESETTING.md §3: Chinese punctuation, one
 * U+0020 after a sentence or closing mark that is followed by text.
 */
export interface HomeCopy {
  role: Localized;
  /** One or two sentences, ≤34em at `type-body-lg`. */
  intro: Localized;
  /** One present-tense sentence. */
  now: Localized;
  /** The About section, short prose. */
  about: Localized;
  /** The paragraph under the Work title on the home page: the development path. */
  workIntro: Localized;
  portrait: {
    src: ImageMetadata;
    alt: Localized;
  };
  sections: {
    work: Localized;
    experience: Localized;
    about: Localized;
  };
  labels: {
    now: Localized;
    built: Localized;
    archived: Localized;
  };
}

const home: HomeCopy = {
  role: site.role,
  intro: {
    en: "Also a musician, designer, developer and former hacker — building things that make noise, in code, in sound and in pixels.",
    zh: "同时也是音乐人、 设计师、 开发者和前黑客——在代码、 声音与像素之间制造噪音。",
  },
  now: {
    en: "Currently building DabChat and DabMusic.",
    zh: "目前在做 DabChat 和 DabMusic。",
  },
  about: {
    en: "Frontend engineer by trade, hacker by instinct, musician by obsession, designer by necessity. I build interfaces, compose systems, and make noise on both sides of the frequency spectrum.",
    zh: "本职前端工程师， 本能是黑客， 痴迷于音乐， 因需要而设计。 我写界面、 搭系统， 在频谱的两端制造噪音。",
  },
  workIntro: {
    en: "In 2021 I taught myself PHP, and that is where web development started for me. The plan was only to learn CSS so I could design the pages I wanted; instead I worked through HTML, CSS, JavaScript and TypeScript, then React — mostly Next.js. In 2023 I moved into full stack and built Cyclic, a Notion-style knowledge base with Markdown, nested notes and public pages. ChatGPT and Claude helped with it, well before AI could take over the work. By 2026, AI agents had made iteration much faster, and I have vibe-coded several projects since.",
    zh: "2021 年， 我自学 PHP， Web 开发也从这里开始。 最初只是想学点 CSS， 好把页面设计成自己想要的样子； 后来一路学下去： HTML、 CSS、 JavaScript， 再到 TypeScript， 然后是 React， 主要是 Next.js。 2023 年我开始尝试全栈， 做出了 Cyclic——一个类 Notion 的知识库， 支持 Markdown、 嵌套笔记和笔记公开分享。 那时 ChatGPT 和 Claude 只是帮手， 离 AI 接管开发还很远。 到了 2026 年， AI Agent 让迭代快了很多， 我已经用 Vibe Coding 做了好几个项目。",
  },
  portrait: {
    src: portrait,
    alt: {
      en: "Portrait of DabAZ",
      zh: "DabAZ 的肖像",
    },
  },
  sections: {
    work: { en: "Work", zh: "作品" },
    experience: { en: "Earlier", zh: "经历" },
    about: { en: "About", zh: "关于" },
  },
  labels: {
    now: { en: "Now", zh: "近况" },
    built: { en: "Built", zh: "构建于" },
    archived: { en: "Archived", zh: "已归档" },
  },
};

export default home;
