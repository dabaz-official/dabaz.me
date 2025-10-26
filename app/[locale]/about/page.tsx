import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Container from '@dabaz/components/layout/container';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About');
  return {
    title: t('Title'),
    description: t('Description'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="pt-20">
      <Container className="px-6 py-20 sm:py-24 lg:px-8 flex flex-col gap-y-20 sm:gap-y-24">
        <section className="relative isolate w-full">
          <div className="text-center">
            <h1 className="text-heading-32 lg:text-heading-40 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10 leading-tight">
              {t('Title')}
            </h1>
            <p className="mt-1 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
              {t('PageDescription')}
            </p>
          </div>
        </section>
        <div className="w-full flex flex-col gap-y-6">
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            {t('Hacker')}
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            {t('Developer')}
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            {t('Musician')}
          </p>
          <p className="text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
            {t('Designer')}
          </p>
        </div>
      </Container>
    </div>
  );
}