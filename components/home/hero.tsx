import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

import Button from '@dabaz/components/ui/button';
import { GitHub, X } from '@dabaz/components/icons';

const Hero = () => {
  return (
    <section className="relative isolate">
      <div className="text-left">
        <h1 className="text-heading-48 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10">
          Hi, I&apos;m DabAZ
        </h1>
        <p className="text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          Hacker · Musician · Software Developer · Designer
        </p>
        <p className="mt-8 text-copy-16 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          DabAZ is a passionate software developer and technology enthusiast dedicated to creating innovative digital solutions. With expertise in modern web technologies and a focus on user experience, DabAZ builds applications that make a meaningful impact.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
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
          <Link href="/about">
            <Button variant="outline" className="cursor-pointer gap-x-2">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;