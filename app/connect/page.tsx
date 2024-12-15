import { Metadata } from "next";

import { NameTransitionConnect } from "./name";

export const metadata: Metadata = {
  title: "Connect",
  description: 'Hi, I’m Diebold Dai, a 6-figure entrepreneur passionate about turning visions into thriving realities.',
}

export default function Page() {
  return (
    <div>
      <NameTransitionConnect />
      <p className="my-6 text-lg">
        Hi, it’s Diebold Dai (DabAZ) again. Thanks for your interest.
      </p>
      <p className="my-6 text-lg">
        The contact form is currently unavailable. You can contact me via <a href="mailto:hi@dabaz.me" className="underline underline-offset-1">Email</a>.
      </p>
    </div>
  )
}
