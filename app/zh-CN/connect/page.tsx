import { Metadata } from "next";

import { NameTransitionConnect } from "./name";
import ContactForm from "./form";

export const metadata: Metadata = {
  title: "联系",
  description: '你好，我是 Diebold Dai，一位热衷于将愿景转化为蓬勃现实的企业家。',
}

export default function Page() {
  return (
    <div>
      <NameTransitionConnect />      <ContactForm />
    </div>
  )
}
