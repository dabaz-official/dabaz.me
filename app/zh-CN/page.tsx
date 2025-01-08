import { Metadata } from 'next'
import Link from 'next/link'

import { NameTransition } from 'app/name'

export const metadata: Metadata = {
  title: {
    default: 'DabAZ - 视角卓越的企业家',
    template: '%s - DabAZ',
  },
  description: '你好，我是 Diebold Dai，一位热衷于将愿景转化为蓬勃现实的企业家。',
  keywords: [
    '6-figure business owner', 
    '6位数收入的企业主',
    '7-figure entrepreneur', 
    '7位数收入的企业家',
    'cross-border e-commerce', 
    '跨境电商',
    'vision-driven leadership', 
    '视野驱动的领导者',
    'self-made entrepreneur', 
    '自我创业者',
    'perseverance', 
    'visionary thinking',
    '远见卓识', 
    'adaptability', 
    'continuous growth', 
    '持续增长',
    'customer-centric', 
    'interdisciplinary innovation', 
    'white-hat hacker', 
    '白帽黑客',
    'creative problem-solving', 
    'front-end development',
    '前端开发', 
    'multi-faceted entrepreneur', 
    'strategic execution', 
    'market expansion', 
    'e-commerce success', 
    'startup challenges', 
    'leadership principles',
    'DabAZ',
    'Diebold Dai',
  ],
  openGraph: {
    title: 'DabAZ - 视角卓越的企业家',
    description: '你好，我是 Diebold Dai，一位热衷于将愿景转化为蓬勃现实的企业家。作为一位拥有六位数收入的企业主，我正在努力突破七位数里程碑。我深知，毅力和清晰的愿景是可持续成功的基石。',
    siteName: 'DabAZ',
    locale: 'zh_CNS',
    type: 'website',
  },
}

export default function Page() {
  return (
    <div>
      <NameTransition />
      <div className='flex text-center gap-x-6'>
        <Link href="/" className='text-md hover:underline hover:underline-offset-1 transition-all duration-300'>
          English ↗
        </Link>
        <a href='https://notion.dabaz.me' target='_blank' className='text-md hover:underline hover:underline-offset-1 transition-all duration-300'>
          Notion 模版 ↗
        </a>
      </div>
      <p className="my-6 text-lg">
        你好，我是 Diebold Dai，一位热衷于将愿景转化为蓬勃现实的企业家。作为一位拥有六位数收入的企业主，我正在努力突破七位数里程碑。我深知，毅力和清晰的愿景是可持续成功的基石。
      </p>
      <p className="my-6 text-lg">
        凭借信息安全的基础，我在技术、设计和音乐等多个领域积累了经验，最终将这些经验融入到创业之中。我的旅程一直秉承着持续学习和适应不断变化的挑战的理念。
      </p>
      <p className="my-6 text-lg">
        目前，我领导一家<a href="https://cobotrading.com" target="_blank" className="underline underline-offset-1 hover:text-indigo-600 transition duration-300">贸易公司</a>，专注于向北美市场提供高质量的产品。我的使命是创建有影响力的企业，不仅实现财务成功，还能为全球客户和合作伙伴创造价值。
      </p>
      <p className="my-6 text-lg">
        除了商业，我还是一名黑客、音乐人、设计师和开发者，将创意和技术专长融入到每一个我参与的项目中。无论是设计无缝的用户体验，还是创作音乐，我都相信跨学科的思维能够激发创新的力量。
      </p>
      <p className="my-6 text-lg">
        让我们<a href="mailto:hi@dabaz.me" className="underline underline-offset-1 hover:text-green-600 transition duration-300">联系</a>起来，共同探索如何建设更美好的未来。
      </p>
    </div>
  )
}
