import Link from 'next/link'
import { SVGProps } from 'react'

export const navItems = {
  '/blog': { name: 'Blog' },
  '/contact': { name: 'Contact' },
  '/cybersecurity': { name: 'Cybersecurity' },
  '/music': { name: 'Music' },
  '/design': { name: 'Design' },
  '/development': { name: 'Development' },
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" fill="currentColor" {...props}>
      <path d="M119.426 96C126.467 83.8039 129.289 69.6258 127.455 55.6629C125.62 41.7001 119.231 28.7322 109.279 18.7689C99.3257 8.80557 86.3644 2.40326 72.4035 0.554109C58.4426 -1.29504 44.2615 1.51224 32.0581 8.5409C19.8546 15.5695 10.3101 26.4271 4.90382 39.4309C-0.502482 52.4347 -1.46873 66.8586 2.15481 80.4673C5.77835 94.076 13.7893 106.11 24.9463 114.703C36.1032 123.297 49.7831 127.97 63.866 128L64 64L119.426 96Z" />
    </svg>
  )
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] tracking-tight bg-black/70 backdrop-blur-lg sticky top-0">
      <div className="max-w-5xl items-center mx-auto my-1">
        <nav
          className="flex flex-row px-0 pb-0 fade md:overflow-auto scroll-pr-6"
          id="nav"
        >
          <div className="flex space-x-0 pr-10 items-center justify-between">
            <Link
              href="/"
              className="flex align-middle relative py-1 px-4 m-1.5 md:m-1 items-center"
            >
              <Logo className="text-neutral-100/80 transition-all hover:text-white h-5 md:h-4" />
            </Link>
            <div className="hidden md:flex md:flex-1 md:justify-end">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="text-neutral-100/80 text-sm transition-all hover:text-white flex align-middle relative py-1 px-4 m-1"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
            <div className="md:hidden flex flex-1 justify-end">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="text-neutral-100/80 text-sm transition-all hover:text-white flex align-middle relative py-1 px-4 m-1"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
