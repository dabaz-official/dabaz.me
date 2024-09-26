'use client';

import Link from 'next/link';
import { SVGProps, useEffect, useRef } from 'react';

import { gsap } from 'gsap/gsap-core';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';

gsap.registerPlugin(MotionPathPlugin);

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
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const line1 = svgRef.current.querySelector('#line-1');
    const line2 = svgRef.current.querySelector('#line-2');

    if (!line1 || !line2) return;

    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current.to(line1, {
      rotation: 45,
      y: 3,
      transformOrigin: "50% 50%",
      duration: 0.3,
    }, 0);

    tlRef.current.to(line2, {
      rotation: -45,
      y: -3,
      transformOrigin: "50% 50%",
      duration: 0.3,
    }, 0);
  }, []);

  const handleClick = () => {
    if (tlRef.current) {
      tlRef.current.reversed(!tlRef.current.reversed());
      tlRef.current.play();
    }
  };

  return (
    <header className="-ml-[8px] tracking-tight bg-black/70 backdrop-blur-lg sticky top-0">
      <Popover className="max-w-5xl items-center mx-auto my-1">
        <nav className="flex flex-row px-0 pb-0 fade md:overflow-auto scroll-pr-6 justify-between" id="nav">
          <div className="flex space-x-0 pr-10 items-center justify-start">
            <Link
              href="/"
              className="flex relative py-1 px-4 m-1.5 md:m-1 items-center justify-start"
            >
              <Logo className="text-neutral-100/80 transition-all hover:text-white h-5 md:h-4" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end">
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
              <div className="flex relative py-1 px-2 m-1.5 md:m-1 items-center justify-start">
                <PopoverButton 
                  className="outline-none"
                  onClick={handleClick}
                >
                  <svg 
                    ref={svgRef}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-neutral-100/80 transition-all hover:text-white h-6 w-6"
                  >
                    <path d="M3.75 9H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="line-1" />
                    <path d="M3.75 15.75H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="line-2" />
                  </svg>
                </PopoverButton>
              </div>
            </div>
          </div>
        </nav>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <PopoverPanel anchor="bottom" className="w-screen h-screen bg-black flex flex-col space-y-2 pt-8 px-3">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-white text-3xl font-semibold tracking-tight transition-all flex align-middle relative py-1"
                >
                  {name}
                </Link>
              )
            })}
          </PopoverPanel>
        </Transition>
      </Popover>
    </header>
  )
}
