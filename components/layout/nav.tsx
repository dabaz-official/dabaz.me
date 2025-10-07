"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import DabAZ from '@dabaz/app/images/dabaz-256w.jpg'
import { MenuIcon, XIcon } from 'lucide-react';

const navLinkClassName = "text-label-18 font-medium text-gray-light-10 dark:text-gray-dark-10 tracking-tight hover:bg-gray-light-2 dark:hover:bg-gray-dark-2 px-2 py-1 rounded-xl transition duration-200 active:bg-gray-light-3 dark:active:bg-gray-dark-3";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="p-1.5 hover:bg-gray-light-1 dark:hover:bg-gray-dark-1 rounded transition duration-200 active:bg-gray-light-2 dark:active:bg-gray-dark-2"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XIcon className="w-5 h-5 text-gray-light-10 dark:text-gray-dark-10" />
        ) : (
          <MenuIcon className="w-5 h-5 text-gray-light-10 dark:text-gray-dark-10" />
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/80" onClick={() => setOpen(false)}>
          <div className="absolute inset-x-0 top-[56px] flex flex-col items-center space-y-6 p-6" onClick={(e) => e.stopPropagation()}>
            <Link href="/blog" className={navLinkClassName} onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className={navLinkClassName} onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" className={navLinkClassName} onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  return (
    <nav aria-label="Global" className="absolute inset-x-0 top-0 z-50 bg-bg-light-1/60 dark:bg-bg-dark-1/60 backdrop-blur-3xl border-b border-bg-light-1 dark:border-bg-dark-1">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-4 lg:px-8">
        <div className="flex space-x-4 items-center">
          <div className="w-8 h-8 bg-bg-light-1/60 dark:bg-bg-dark-1/60 rounded-full">
            <Image
              src={DabAZ}
              alt="DabAZ"
              width={256}
              height={256}
              className="rounded-full"
            />
          </div>
          <Link href="/" className="hidden sm:flex text-label-20 font-medium text-gray-light-10 dark:text-gray-dark-10 tracking-tight">
            DabAZ
          </Link>
        </div>
        <div className="hidden sm:flex sm:space-x-4 lg:space-x-6 items-center">
          <Link href="/blog" className={navLinkClassName}>
            Blog
          </Link>
          <Link href="/about" className={navLinkClassName}>
            About
          </Link>
          <Link href="/contact" className={navLinkClassName}>
            Contact
          </Link>
        </div>
        <div className="flex sm:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;