import Link from 'next/link';
import { Mail } from 'lucide-react';

import Button from '@dabaz/components/ui/button';
import { GitHub, X } from '@dabaz/components/icons';

const HeroSocial = [
  { href: "mailto:hi@dabaz.me", label: "Email", Icon: Mail },
  { href: "https://x.com/dabaz_official", label: "X", Icon: X, target: "_blank" },
  { href: "https://github.com/dabaz-official", label: "GitHub", Icon: GitHub, target: "_blank" },
]

const Hero = () => {
  return (
    <section className="relative isolate w-full">
      <div className="text-center">
        <h1 className="text-heading-48 font-medium text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10">
          Hi, I&apos;m DabAZ
        </h1>
        <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Hacker · Musician
          <br />
          Developer · Designer
        </p>
        <p className="mt-6 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Former hacker. Music-maker. I also design album covers and posters for rappers, craft UIs for developers, and build projects with code. Welcome here!
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 mx-auto w-full">
          {HeroSocial.map(({ href, label, Icon, target }) => (
            <Link key={label} href={href} target={target}>
              <Button variant="outline" className="cursor-pointer gap-x-2">
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;