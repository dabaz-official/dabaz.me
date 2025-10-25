import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import projects from '@dabaz/data/projects';

const ProjectList = () => {
  const t = useTranslations('Projects');

  return (
    <section className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
        </div>
      ))}
    </section>
  );
}

export default ProjectList;