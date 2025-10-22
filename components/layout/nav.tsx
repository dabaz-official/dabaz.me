'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

import DabAZ from '@dabaz/app/images/dabaz-256w.jpg'
import Container from '@dabaz/components/layout/container';
import Button from '@dabaz/components/ui/button';
import { navigation } from '@dabaz/data/navigation';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0, y: -4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: 'beforeChildren', duration: 0.16, staggerChildren: 0.08, delayChildren: 0.08 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <nav aria-label="Global" className="absolute inset-x-0 top-0 z-50 bg-bg-light-2/60 dark:bg-bg-dark-2/60 backdrop-blur-3xl border-b border-bg-light-2 dark:border-bg-dark-2">
      <Container className="p-6 lg:px-8">
        <div className="flex space-x-4 items-center">
          <Link
            href="/"
            className="w-8 h-8 bg-bg-light-1/60 dark:bg-bg-dark-1/60 rounded-full z-[70]"
          >
            <Image
              src={DabAZ}
              alt="DabAZ"
              width={256}
              height={256}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="hidden sm:flex sm:gap-x-4 lg:gap-x-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
            >
              <Button variant="navlink">
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="relative flex items-center sm:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[70] p-1.5 hover:bg-gray-light-1 dark:hover:bg-gray-dark-1 rounded transition duration-200 active:bg-gray-light-2 dark:active:bg-gray-dark-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="w-5 h-5 text-gray-light-10 dark:text-gray-dark-10" />
            ) : (
              <Menu className="m-0.5 w-4 h-4 text-gray-light-10 dark:text-gray-dark-10" />
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60]"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className="absolute inset-x-0 top-[3.5rem] flex flex-col items-start space-y-4 p-6 bg-bg-light-2 dark:bg-bg-dark-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                    >
                      <Link href={item.href}>
                        <Button variant="mobilelink">
                          {item.name}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;