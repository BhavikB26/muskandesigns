import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { projects } from "@/content/projects";
import { Background } from "@/components/home/background";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="page-in flex w-full flex-col">
        <Hero />
        <Work projects={projects} />
        <Background />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}
