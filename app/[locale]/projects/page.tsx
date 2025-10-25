import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";

import Container from '@dabaz/components/layout/container';
import ProjectsHero from '@dabaz/components/projects/hero';
import ProjectList from '@dabaz/components/projects/project-list';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Projects");
  return {
    title: t("Heading"),
    description: t("Description"),
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations("Projects");

  return (
    <div className="pt-20">
      <Container className="px-6 py-20 sm:py-24 lg:px-8 flex flex-col gap-y-20 sm:gap-y-24">
        <ProjectsHero />
        <ProjectList />
      </Container>
    </div>
  );
}