import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { WorkGrid } from "@/components/home/work-grid";
import { Background } from "@/components/home/background";
import { Principles } from "@/components/home/principles";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex w-full flex-col">
        <Hero />
        <WorkGrid />
        <Background />
        <Principles />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}
