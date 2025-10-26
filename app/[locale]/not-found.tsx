'use client';

import { useTranslations } from 'next-intl';

import Container from '@dabaz/components/layout/container';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="pt-20">
      <Container className="px-6 py-36 sm:py-32 lg:px-8 flex flex-col gap-y-20 sm:gap-y-24">
        <h1 className="text-heading-32 lg:text-heading-40 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10 leading-tight">
          {t('Heading')}
        </h1>
        <p className="mt-1 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-9 dark:text-gray-dark-9">
          {t('SubHeading')}
          <br />
          {t('SubHeading2')}
        </p>
      </Container>
    </div>
  );
}