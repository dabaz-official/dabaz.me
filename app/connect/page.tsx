import { Metadata } from "next";

import { NameTransitionConnect } from "./name";
import ContactForm from "./form";

export const metadata: Metadata = {
  title: "Connect",
  description: 'Hi, I’m Diebold Dai, a 6-figure entrepreneur passionate about turning visions into thriving realities.',
}

export default function Page() {
  return (
    <div>
      <NameTransitionConnect />
      <ContactForm />
    </div>
  )
}
