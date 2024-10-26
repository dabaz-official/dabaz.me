'use client';

import Link from 'next/link';
import { useState, Fragment } from 'react';

import { gsap } from 'gsap/gsap-core';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';
import clsx from 'clsx';

import { Logo } from '../global/dabaz-logo';

gsap.registerPlugin(MotionPathPlugin);

export const navItems = {
  '/blog': { name: '博客' },
  '/contact': { name: '联系' },
  '/cybersecurity': { name: '网络安全' },
  '/music': { name: '音乐' },
  '/design': { name: '设计' },
  '/development': { name: '开发' },
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="-ml-[8px] tracking-tight sticky top-0 bg-white/80 backdrop-blur-lg">
      <Popover className="max-w-5xl items-center mx-auto">
        {({ open }) => (
          <div>
            <nav className="flex flex-row px-0 py-2 fade md:overflow-auto scroll-pr-6 justify-between" id="nav">
              <div className="flex space-x-0 pr-10 items-center justify-start">
                <div className="px-4 m-1.5 md:m-1">
                  <Link
                    href="/"
                    className="flex relative items-center justify-start"
                  >
                    <Logo className="text-neutral-900/80 transition-all hover:text-black h-5" />
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
                          className="text-neutral-900/80 text-sm transition-all hover:text-black flex align-middle relative"
                        >
                          {name}
                        </Link>
                      </div>
                    )
                  })}
                </div>
                <div className="md:hidden flex flex-1 justify-end">
                  <div className="flex relative py-1 px-2 m-1.5 md:m-1 items-center justify-start">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="outline-none cursor-pointer"
                    >
                      <HiChevronDown className={clsx("text-neutral-900/80 transition-all duration-500 hover:text-black h-6 w-6", open && "rotate-180")} />
                    </button>
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
              <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-50' />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className='flex items-center justify-between'>
                    <Link
                      href="/"
                      className="flex relative items-center justify-start"
                    >
                      <Logo className="text-neutral-900/80 transition-all hover:text-black h-5" />
                    </Link>
                  </div>
                </DialogPanel>
              </Dialog>
              <PopoverPanel static anchor="left" className="w-4xl h-screen flex flex-col relative bg-white pt-8 px-12 top-24">
                <div className="space-y-2">
                  {Object.entries(navItems).map(([path, { name }]) => {
                    return (
                      <Link
                        key={path}
                        href={path}
                        className="text-black text-3xl font-semibold tracking-tight transition-all flex align-middle relative py-1"
                      >
                        {name}
                      </Link>
                    )
                  })}
                </div>
              </PopoverPanel>
            </Transition>
          </div>
        )}
      </Popover>
    </header>
  )
}
