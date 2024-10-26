import Image from 'next/image'

import { BlogPosts } from 'app/components/posts'
import { NameTransition } from './name'

export default function Page() {
  return (
    <div>
      <NameTransition />
      <p className="my-6 font-medium">
        {`我是一名创业者、白帽黑客、音乐人、设计师、前端开发爱好者。 我还喜欢电子游戏、骑行与内容创作。`}
      </p>
    </div>
  )
}
