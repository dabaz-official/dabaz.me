import { NameTransition } from './name'

export default function Page() {
  return (
    <div>
      <NameTransition />
      <p className="my-6 text-lg">
        {`Hi, I’m Diebold Dai, an entrepreneur passionate about turning visions into thriving realities. As a 6-figure business owner striving to reach the 7-figure milestone, I’ve learned that perseverance and a clear vision are the cornerstones of sustainable success.`}
      </p>
      <p className="my-6 text-lg">
        With a foundation in information security, I’ve built my career across diverse fields, including technology, design, and music, eventually channeling these experiences into entrepreneurship. My journey has been shaped by a commitment to continuous learning and the ability to adapt to ever-changing challenges.
      </p>
      <p className="my-6 text-lg">
        Currently, I lead a <a href="https://cobotrading.com" target="_blank" className="underline underline-offset-1 hover:text-indigo-600 transition duration-300">trading company</a>, focusing on providing high-quality products to the North American market. My mission is to create impactful businesses that not only achieve financial success but also deliver value to customers and partners worldwide.
      </p>
      <p className="my-6 text-lg">
        Beyond business, I’m a hacker, musician, designer, and developer, blending creativity and technical expertise into every project I pursue. Whether it’s crafting seamless user experiences or composing music, I believe in the power of interdisciplinary thinking to inspire innovation.
      </p>
      <p className="my-6 text-lg">
        Let’s <a href="mailto:hi@dabaz.me" className="underline underline-offset-1 hover:text-green-600 transition duration-300">connect</a> and explore how we can build a better future together.
      </p>
    </div>
  )
}
