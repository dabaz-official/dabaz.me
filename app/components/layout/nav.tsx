'use client';

import Link from 'next/link';
import { useEffect, useRef, Fragment } from 'react';

import { gsap } from 'gsap/gsap-core';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';
import clsx from 'clsx';

import { Logo } from '../global/dabaz-logo';

gsap.registerPlugin(MotionPathPlugin);

export const navItems = {
  '/blog': { name: 'Blog' },
  '/contact': { name: 'Contact' },
  '/cybersecurity': { name: 'Cybersecurity' },
  '/music': { name: 'Music' },
  '/design': { name: 'Design' },
  '/development': { name: 'Development' },
}

export function Navbar() {
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
        {({ open }) => (
          <>
            <nav className="flex flex-row px-0 pb-0 fade md:overflow-auto scroll-pr-6 justify-between" id="nav">
              <div className="flex space-x-0 pr-10 items-center justify-start">
                <div className="py-1 px-4 m-1.5 md:m-1">
                  <Link
                    href="/"
                    className="flex relative items-center justify-start"
                  >
                    <Logo className="text-neutral-100/80 transition-all hover:text-white h-5 md:h-4" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end">
                <div className="hidden md:flex md:flex-1 md:justify-end">
                  {Object.entries(navItems).map(([path, { name }]) => {
                    return (
                      <div className="pl-8 py-1">
                        <Link
                          key={path}
                          href={path}
                          className="text-neutral-100/80 text-sm transition-all hover:text-white flex align-middle relative"
                        >
                          {name}
                        </Link>
                      </div>
                    )
                  })}
                </div>
                <div className="md:hidden flex flex-1 justify-end">
                  <div className="flex relative py-1 px-2 m-1.5 md:m-1 items-center justify-start">
                    <PopoverButton 
                      className="outline-none cursor-pointer"
                      onClick={handleClick}
                    >
                      <HiChevronDown className={clsx("text-neutral-100/80 transition-all duration-500 hover:text-white h-6 w-6", open && "rotate-180")} />
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
              <PopoverPanel anchor="bottom" className="w-screen h-screen bg-black flex flex-col space-y-2 pt-8 px-12">
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
          </>
        )}
      </Popover>
    </header>
  )
}
