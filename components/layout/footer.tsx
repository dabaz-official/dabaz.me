import Link from 'next/link';

import Container from '@dabaz/components/layout/container';
import social from '@dabaz/data/social';
import Button from '@dabaz/components/ui/button';
import { Globe } from 'lucide-react';
import { DabAZ } from '../icons';

const Footer = () => {
  return (
    <footer aria-label="Footer" className="bg-bg-light-2 dark:bg-bg-dark-1">
      <Container className="px-6 pt-12 pb-6 lg:px-8 flex flex-col">
        <div className="w-full flex flex-col items-start gap-4.5 md:gap-3 pb-12">
          <DabAZ className="w-full h-full text-gray-light-10 dark:text-gray-dark-10" />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center pt-6 border-t border-gray-light-4 dark:border-gray-dark-4 gap-5 md:gap-0">
          <p className="text-copy-14 text-gray-light-10 dark:text-gray-dark-10 text-center md:text-left">
            DabAZ &copy; {new Date().getFullYear()}
          </p>
          <div className="flex flex-col items-center gap-4.5 md:gap-3 md:flex-row md:items-center">
            <ul
              role="list"
              className="flex items-center gap-x-6"
            >
              {social.footer.map(({ href, label, Icon }) => (
                <li key={label}>
                  <Link href={href} target="_blank">
                    <Icon className="h-4.5 w-4.5 text-gray-light-10 hover:text-gray-light-9 dark:text-gray-dark-10 dark:hover:text-gray-dark-9 transition duration-200" />
                    <p className="sr-only">{label}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="navlink" className="flex items-center space-x-2 group">
              <Globe className="h-4.5 w-4.5 text-gray-light-10 dark:text-gray-dark-10" />
              <p className="sr-only">The current language is</p>
              <p className="text-copy-14 text-gray-light-10 dark:text-gray-dark-10">
                English
              </p>
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;