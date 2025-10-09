import Link from 'next/link';
import { Mail } from 'lucide-react';

import Button from '@dabaz/components/ui/button';
import { GitHub, X } from '@dabaz/components/icons';

const Hero = () => {
  return (
    <section className="relative isolate">
      <div className="text-left">
        <h1 className="text-heading-48 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10">
          Hi, I&apos;m DabAZ
        </h1>
        <p className="text-copy-16 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Hacker · Musician
        </p>
        <p className="text-copy-16 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Developer · Designer
        </p>
        <p className="mt-6 text-copy-16 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Former hacker. Music-maker. I also design album covers and posters for rappers, craft UIs for developers, and build projects with code.
        </p>
        <div className="mt-8 flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6">
          <Link href="mailto:hi@dabaz.me">
            <Button variant="outline" className="cursor-pointer gap-x-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </Link>
          <Link href="https://x.com/dabaz_official" target="_blank">
            <Button variant="outline" className="cursor-pointer gap-x-2">
              <X className="h-4 w-4" />
              X
            </Button>
          </Link>
          <Link href="https://github.com/dabaz-official" target="_blank">
            <Button variant="outline" className="cursor-pointer gap-x-2">
              <GitHub className="h-4 w-4" />
              GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;