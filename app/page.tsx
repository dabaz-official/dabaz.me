import Contact from "@dabaz/components/home/contact";
import Hero from "@dabaz/components/home/hero";
import Sound from "@dabaz/components/home/sound";
import Whoami from "@dabaz/components/home/whoami";
import Work from "@dabaz/components/home/work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Whoami />
      <Work />
      <Sound />
      <Contact />
    </>
  );
}
