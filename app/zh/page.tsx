import Hero from "@dabaz/components/home/hero";
import Sound from "@dabaz/components/home/sound";
import Whoami from "@dabaz/components/home/whoami";
import Work from "@dabaz/components/home/work";

const locale = "zh" as const;

export default function HomePage() {
  return (
    <>
      <Hero locale={locale} />
      <Whoami locale={locale} />
      <Work locale={locale} />
      <Sound locale={locale} />
    </>
  );
}
