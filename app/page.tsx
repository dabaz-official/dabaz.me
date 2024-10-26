import Image from 'next/image'

import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section className="m-0 p-0 h-screen top-0">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter mx-auto">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`我是一名创业者、白帽黑客、音乐人、设计师、前端开发爱好者。`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
