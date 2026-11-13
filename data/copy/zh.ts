const zh = {
  skip: "跳到主要内容",
  social: {
    email: "邮箱",
  },
  nav: {
    work: "作品",
    sound: "声音",
    cv: "CV",
  },
  hero: {
    prompt: "$ whoami",
    intro: "黑客、 音乐人、 设计师、 开发者——在代码、 声音与像素之间制造噪音。",
  },
  whoami: {
    label: "关于",
    summary:
      "本职前端工程师， 本能是黑客， 痴迷于音乐， 因需要而设计。 我写界面、 搭系统， 在频谱的两端制造噪音。",
    identities: [
      { name: "黑客", line: "把东西拆开、 掰弯， 直到它讲得通" },
      { name: "音乐人", line: "合成器、 未发布的曲目与声音设计" },
      { name: "设计师", line: "有意图的字体、 网格与像素" },
      { name: "开发者", line: "交付能一直保持快速的界面" },
    ],
  },
  work: {
    label: "作品",
    role: "开发者",
    descriptions: {
      DabMusic: "一个能播放未发布曲目的音乐播放器。",
      DabSudoku: "一个可以直接在线玩的数独游戏。",
      Cyclic: "一个随时随地记笔记的笔记应用。",
    },
  },
  sound: {
    label: "声音",
    statusOnline: "> 环境引擎 ......... 在线",
    statusStandby: "> 环境引擎 ......... 待命——用顶部的声音开关开启",
    trackLayer: "> 曲目层 ........... 已连接（spotify）",
    description:
      "一台在你的浏览器里实时合成的生成式环境音引擎——用顶部的声音开关开启。 正式发行的作品仍在上面这些平台。",
  },
  terminal: {
    placeholder: "输入命令…",
    empty: "找不到命令",
    inputLabel: "终端命令输入",
    suggestionsLabel: "命令建议",
  },
  palette: {
    dialogLabel: "命令面板",
    placeholder: "输入命令…",
    inputLabel: "命令输入",
    empty: "找不到命令",
    navigate: "↑↓ 选择",
    run: "↵ 执行",
    close: "esc 关闭",
  },
  commands: {
    home: "回到首页",
    work: "查看项目",
    sound: "音频区块",
    cv: "简历站点",
    contact: "打个招呼",
    theme: "切换主题",
    audioOn: "关闭环境音",
    audioOff: "开启环境音",
    hire: "打开邮件客户端",
    github: "@dabaz-official",
    spotify: "艺人页面",
  },
  boot: {
    lines: [
      "DABAZ BIOS v27.0.0",
      "> 内存 ................. 正常",
      "> 设计变量 ............. 已加载",
      "> 字体 ................. clash / general-sans / geist-mono",
      "> 音频引擎 ............. 待命",
      "> 身份 ................. hacker.musician.designer.developer",
      "",
      "$ whoami",
    ],
    skip: "[ 点击或按任意键跳过 ]",
  },
  console: {
    signature: "DABAZ_ v27.0.0——从零重写",
    opened: "> 你打开了控制台， 黑客认证通过。",
    hint: "> 试试 ⌘K——这个站点接受命令。",
  },
  toggles: {
    soundOn: "静音环境音",
    soundOff: "取消静音环境音",
    light: "切换到浅色模式",
    dark: "切换到深色模式",
  },
  notFound: {
    label: "404 — 找不到这个目录",
    title: "这里什么都没有",
    back: "cd ~/",
  },
};

export default zh;
