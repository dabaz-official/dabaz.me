import Image from 'next/image';
import Link from 'next/link';

import Button from '@dabaz/components/ui/button';
import projects from '@dabaz/data/projects';

const Projects = () => {
  return (
    <section className="relative w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-copy-18 lg:text-copy-20 text-pretty text-gray-light-10 dark:text-gray-dark-10 font-medium">
            Projects
          </p>
        </div>
        <Link href="/projects">
          <Button variant={"ghost"} className="font-medium text-copy-14 lg:text-copy-16">
            View all
          </Button>
        </Link>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:mx-0"
      >
        {projects.slice(0, 2).map((project) => (
          <li key={project.name}>
            <Image
              src={project.image}
              alt={project.name}
              width={1920}
              height={1080}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
            />
            <h3 className="mt-2 text-copy-18 lg:text-copy-20 text-gray-light-10 dark:text-gray-dark-10 font-medium">
              {project.name}
            </h3>
            <p className="text-copy-14 lg:text-copy-16 text-gray-light-9 dark:text-gray-dark-9">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
