import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import projects from '@dabaz/data/projects';

const ProjectList = () => {
  const t = useTranslations('Projects');

  return (
    <section className="mx-auto grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {projects.map((project) => (
        <div key={project.key} className="flex flex-col items-start justify-between">
          <Link
            href={project.url}
            target="_blank"
            className="relative w-full"
          >
            <Image
              src={project.image}
              alt={project.key}
              width={1920}
              height={1080}
              className="aspect-[16/9] w-full rounded-2xl bg-gray-light-1 dark:bg-gray-dark-1 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
          </Link>
          <div className="max-w-xl">
            <div className="group relative">
              <h3 className="mt-3 text-heading-16 lg:text-heading-20 text-gray-light-10 dark:text-gray-dark-10 font-bold tracking-tight">
                <Link href={project.url} target="_blank">
                  <span className="absolute inset-0" />
                  {project.key}
                </Link>
              </h3>
              <p className="mt-1 text-copy-16 text-gray-light-9 dark:text-gray-dark-9">
                {t(project.key)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProjectList;