import { SiteHeader } from "@/components/site-header";
import { WithFooter } from "@/components/site-footer";
import { HomeIntro } from "@/components/home/hero";
import { HOME_ROWS, Work } from "@/components/home/work";
import { HOME_TILES } from "@/content/work";
import { Skills } from "@/components/home/skills";
import { Background } from "@/components/home/background";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <WithFooter header={<SiteHeader />}>
      <main id="main" tabIndex={-1} className="page-in flex w-full flex-col">
        <HomeIntro next={<Work tiles={HOME_TILES} rows={HOME_ROWS} viewAll />} />
        <Skills />
        <Background />
        <Testimonials />
      </main>
    </WithFooter>
  );
}
