import type { Metadata } from 'next';

import Container from '@dabaz/components/layout/container';

export const metadata: Metadata = {
  title: "Nothing Matters",
  description: "Nothing really matters at all.",
};

export default function NothingMatters() {
  return (
    <div className="pt-20">
      <Container className="px-6 py-20 sm:py-24 lg:px-8 flex flex-col gap-y-20 sm:gap-y-24">
        <section className="relative isolate w-full">
          <div className="text-center">
            <h1 className="text-heading-32 lg:text-heading-40 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10 leading-tight">
              Nothing Matters
            </h1>
            <p className="mt-1 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
              Nothing really matters at all.
            </p>
          </div>
        </section>
        <div className="w-full flex flex-col gap-y-6">
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            不知道从哪里讲起，我先说说我自己吧。我是个<span className="text-gray-light-10 dark:text-gray-dark-10">敏感的人</span>，又是个<span className="text-gray-light-10 dark:text-gray-dark-10">焦虑型依恋</span>。这两点你很清楚，我很抱歉是现在这样，给你带来了不少麻烦。很多不该生气的玩笑，我会生气；很多不该起疑虑的事情，我会猜忌；很多普通平凡的事情，我会多想。我从来没想过去改，直到我进入了这一段和你的关系中，因为我觉得这是一段可以长久发展的关系，是一段良性关系。换句话说，我想永远和你在一起。还记得我们当时说这段关系很健康，但似乎逐渐也变得没那么健康了。我现在越来越觉得我的心理问题很严重（我片面地觉得焦虑型依恋和敏感都是心理问题）。
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9 pb-6 border-b border-gray-light-4 dark:border-gray-dark-4">
            然后以下内容作为 archive 归档。
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            昨天这件事情带来的焦虑，我不知道我什么时候能克服，让时间来告诉我答案吧。我再仔细讲一遍（主要是想保留文字记录），我<span className="text-gray-light-10 dark:text-gray-dark-10">当时</span>以及现在的心路历程大概是：
          </p>
          <div className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9 p-6 border-l border-gray-light-4 dark:border-gray-dark-4 border-2 rounded-2xl bg-bg-dark-1">
            我打开抖音，navbar 里的“朋友”按钮显示你的头像，然后点进去，看到了你的新作品。作品文案是“时间线近三个月。总结中依旧夹带少量私货。”我脑中自动提炼出来的信息是“近三个月”“总结”，然后我想到我们在一起也近三个月，于是我开始期待看到我自己。<br /><br />
            第一张是个表情包，第二张不知道在哪吃的，第三张是 Insta360，第四张是你朋友圈发过的蜥蜴，第五张和第六张是小狗，第七张是冯萧（不算是回溯性嫉妒，因为我觉得是 Nov 19, 2025 也就是昨天的 12:27 AM 发的“近三个月”“总结”里有他但是没有我），聊天记录的时间我们还不算谈上，你跟我也说过“这可太有归属感了”，图片是同一张然后我推出了时间，是 Aug 25, 2025。后面太多了，不一一说了。你挂了很多你和别人的聊天记录，不管是 WeChat 还是抖音的，唯独没有和我的聊天记录。也挂了不少你从来没有给我发过的图（this is totally fine）。<br /><br />
            甚至我看到最后的镜头成像我都觉得最后可能有一张是关于我的。但我翻到了最后一张，是个表情包。那一瞬间，我心凉了，巨大的落差感、失落、不安、焦虑，我对你似乎没那么信任了。因为你在“近三个月”的“总结”里抹除了所有我的痕迹、关于我的照片或者聊天记录等等。<br /><br />
            我一遍遍地想，大概是我惹你生气了，你故意没发的。但是我越想越觉得不对劲，有多生气才会这样做？我迷惑，我不解，可是在 Discord 的 voice channel 里没有你的踪影，你也还在睡觉。那几个小时我极度的焦虑，我想做点什么，但我无论做什么都静不下来。那种感觉就像心脏在发颤（我很真实地感受到），痛苦无边无际。<br /><br />
            现在，翻看一张张照片时的期待、翻到最后发现没有自己痕迹时的失落与不安、发现有冯萧却没有我的嫉妒，种种情绪依然在左右着我，所以我情绪很复杂，这两天也会莫名其妙开始焦虑。
          </div>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9 pb-6 border-b border-gray-light-4 dark:border-gray-dark-4">
            我当然理解你的好心，只不过这真的伤到了我。我希望你知道，我认为我在你的作品里出现比被隐藏要好太多，不管是和谁一起出现。Anyways 我很感激你对我很有耐心地解释，也在沟通（也许我求了，但本来就是你自愿的）后发出了和我的抖音作品。谢谢。你之前从来没发过，然后你做到了，屌。
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            我把它以文字形式记录下来，希望你不会感到太烦或者困扰，我真的只是需要抒发一下。我希望我的感受不会让你太糟糕，我很愧疚向你表达这些。
          </p>
        </div>
      </Container>
    </div>
  );
}
