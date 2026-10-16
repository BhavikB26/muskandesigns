import { SiteHeader } from "@/components/site-header";
import { WithFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { HOME_TILE_COUNT, WORK_TILES } from "@/content/work";
import { Skills } from "@/components/home/skills";
import { Background } from "@/components/home/background";
import { Journey } from "@/components/home/journey";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <WithFooter>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="page-in flex w-full flex-col">
        <Hero />
        <Work tiles={WORK_TILES.slice(0, HOME_TILE_COUNT)} viewAll />
        <Skills />
        <Background />
        <Journey />
        <Testimonials />
      </main>
    </WithFooter>
  );
}
