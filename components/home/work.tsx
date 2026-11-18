import Image from "next/image";

import SectionHeader from "@dabaz/components/home/section-header";
import Container from "@dabaz/components/layout/container";
import copyByLocale from "@dabaz/data/copy";
import projects from "@dabaz/data/projects";
import type { Locale } from "@dabaz/data/site";

export default function Work({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];

  return (
    <Container id="work" className="scroll-mt-24 pb-0 pt-16">
      <SectionHeader index="02" label={copy.work.label} />
      <ol className="mt-8 border-t border-line">
        {projects.map((project) => (
          <li key={project.key} className="border-b border-line">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-1 gap-x-8 gap-y-4 py-7 sm:grid-cols-[9rem_1fr]"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {copy.work.role}
                </p>
                {project.image && (
                  <div className="mt-4 w-24 border border-line bg-bg p-1">
                    <Image
                      src={project.image}
                      alt={project.key}
                      width={224}
                      height={140}
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight underline-offset-4 group-hover:underline sm:text-3xl">
                  {project.key}
                </h3>
                <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted">
                  {copy.work.descriptions[
                    project.key as keyof typeof copy.work.descriptions
                  ]}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </Container>
  );
}
