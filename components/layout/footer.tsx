'use client';

import { Link, usePathname, useRouter } from '@dabaz/i18n/navigation';
import { Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';

import Container from '@dabaz/components/layout/container';
import social from '@dabaz/data/social';
import Button from '@dabaz/components/ui/button';
import { DabAZ } from '@dabaz/components/icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const Footer = () => {
  const t = useTranslations('Footer');
  const tSocial = useTranslations('Social');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

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
              {social.footer.map(({ href, key, Icon }) => (
                <li key={key}>
                  <Link href={href} target="_blank">
                    <Icon className="h-4.5 w-4.5 text-gray-light-10 hover:text-gray-light-9 dark:text-gray-dark-10 dark:hover:text-gray-dark-9 transition duration-200" />
                    <p className="sr-only">{tSocial(key)}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="navlink" className="flex items-center space-x-2 group">
                  <Globe className="h-4.5 w-4.5 text-gray-light-10 dark:text-gray-dark-10" />
                  <p className="sr-only">
                    {t('LanguageSR')}
                  </p>
                  <p className="text-copy-14 text-gray-light-10 dark:text-gray-dark-10">
                    {t('Language')}
                  </p>
                </Button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent asChild className="w-56 bg-bg-light-2/60 dark:bg-bg-dark-2/60 backdrop-blur-sm border border-gray-light-4 dark:border-gray-dark-4 rounded-2xl" align="start">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <DropdownMenuItem className="min-w-full p-0">
                      <button
                        onClick={() => switchLocale('en-US')}
                        className="w-full px-2 py-1.5 text-copy-14 text-gray-light-10 dark:text-gray-dark-10 block hover:bg-gray-light-10/10 dark:hover:bg-gray-dark-10/10 rounded-xl transition duration-200 text-left"
                      >
                        English
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full p-0">
                      <button
                        onClick={() => switchLocale('zh-CN')}
                        className="w-full px-2 py-1.5 text-copy-14 text-gray-light-10 dark:text-gray-dark-10 block hover:bg-gray-light-10/10 dark:hover:bg-gray-dark-10/10 rounded-xl transition duration-200 text-left"
                      >
                        中文
                      </button>
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;