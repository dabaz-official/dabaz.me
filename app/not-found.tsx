import { Back } from "./blog/back";

export default function NotFound() {
  return (
    <section className="pt-12">
      <Back />
      <h1 className="mb-8 font-semibold tracking-tighter">
        404 - 未找到页面
      </h1>
      <p className="mb-4">你访问的页面不存在。</p>
    </section>
  )
}
