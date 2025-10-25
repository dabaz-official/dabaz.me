import { useTranslations } from 'next-intl';

const ProjectsHero = () => {
  const t = useTranslations('Projects');

  return (
    <section className="relative isolate w-full">
      <div className="text-center">
        <h1 className="text-heading-32 lg:text-heading-40 font-bold text-balance tracking-tight text-gray-light-10 dark:text-gray-dark-10 leading-tight">
          {t('Heading')}
        </h1>
        <p className="mt-6 text-copy-16 lg:text-copy-18 text-pretty text-gray-light-10 dark:text-gray-dark-10">
          {t('Description')}
        </p>
      </div>
    </section>
  );
}

export default ProjectsHero;