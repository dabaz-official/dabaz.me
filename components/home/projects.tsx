import Image from 'next/image';
import Link from 'next/link';

import Button from '@dabaz/components/ui/button';
import projects from '@dabaz/data/projects';

const ProjectsSection = () => {
  return (
    <section className="relative w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-heading-24 lg:text-heading-32 text-pretty text-gray-light-10 dark:text-gray-dark-10 font-bold tracking-tight">
            Projects
          </p>
        </div>
        <Link href="/projects">
          <Button variant={"ghost"} className="font-medium text-copy-14">
            View all
          </Button>
        </Link>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0"
      >
        {projects.slice(0, 2).map((project) => (
          <li key={project.name} className="group">
            <Link href={project.url} target="_blank">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={1920}
                  height={1080}
                  className="object-cover hover:scale-105 transition duration-200"
                />
              </div>
              <h3 className="mt-3 text-heading-16 lg:text-heading-20 text-gray-light-10 dark:text-gray-dark-10 font-bold tracking-tight">
                {project.name}
              </h3>
              <p className="mt-1 text-copy-16 text-gray-light-9 dark:text-gray-dark-9">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsSection;
