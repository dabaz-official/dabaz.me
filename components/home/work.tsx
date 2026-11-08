import Image from "next/image";

import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";
import projects from "@dabaz/data/projects";

export default function Work() {
  return (
    <Container id="work" className="scroll-mt-20 py-24">
      <SectionHeader index="02" label="Work" />
      <ul className="mt-10 flex flex-col border-t border-line">
        {projects.map((project, i) => (
          <li key={project.key}>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-6 border-b border-line py-8 transition-colors hover:bg-accent sm:flex-row sm:items-center sm:gap-10"
            >
              <span className="font-mono text-sm text-muted group-hover:text-accent-ink/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-3xl font-semibold group-hover:text-accent-ink sm:text-5xl">
                  {project.key}
                </h3>
                <p className="mt-2 font-mono text-sm text-muted group-hover:text-accent-ink/70">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted group-hover:text-accent-ink/70">
                  {project.role}
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border border-line sm:w-56 group-hover:border-accent-ink/30">
                <Image
                  src={project.image}
                  alt={project.key}
                  fill
                  sizes="(min-width: 640px) 224px, 100vw"
                  className="object-cover"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
