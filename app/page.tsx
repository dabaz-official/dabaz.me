import Container from '@dabaz/components/layout/container';
import Hero from '@dabaz/components/home/hero';
import Projects from '@dabaz/components/home/projects';

export default function Home() {
  return (
    <div className="pt-20">
      <Container className="px-6 py-20 sm:py-24 lg:px-8 flex flex-col gap-y-20 sm:gap-y-24">
        <Hero />
        <Projects />
      </Container>
    </div>
  );
}
