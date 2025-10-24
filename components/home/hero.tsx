import Link from 'next/link';

import Button from '@dabaz/components/ui/button';
import social from '@dabaz/data/social';

const Hero = () => {
  return (
    <section className="relative isolate w-full">
      <div className="text-center">
        <h1 className="text-heading-32 lg:text-heading-40 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10 leading-tight">
          Hi, I&apos;m DabAZ
        </h1>
        <p className="mt-1 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Hacker · Musician
          <br />
          Developer · Designer
        </p>
        <p className="mt-6 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-10 dark:text-gray-dark-10">
          Former hacker. Music-maker. I also design album covers and posters for rappers, craft UIs for developers, and build projects with code.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 mx-auto w-full">
          {social.hero.map(({ href, label, Icon, target }) => (
            <Link key={label} href={href} target={target}>
              <Button variant="outline" className="cursor-pointer gap-x-2">
                <Icon className="h-4 w-4" />
                <p className="text-copy-13 lg:text-copy-14">{label}</p>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;