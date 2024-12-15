import Image from 'next/image'

import { BlogPosts } from 'app/components/posts'
import { NameTransition } from './name'

export default function Page() {
  return (
    <div>
      <NameTransition />
      <p className="my-6 font-regular">
        {`Hi, I’m Diebold Dai, an entrepreneur passionate about turning visions into thriving realities. As a 6-figure business owner striving to reach the 7-figure milestone, I’ve learned that perseverance and a clear vision are the cornerstones of sustainable success.`}
      </p>
      <BlogPosts />
    </div>
  )
}
