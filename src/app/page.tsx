import { Nav } from "@/components/nav";
import { StickyNavReveal } from "@/components/sticky-nav-reveal";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { About } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { Process } from "@/components/home/process";
import { Testimonials } from "@/components/home/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <StickyNavReveal>
        <Nav />
      </StickyNavReveal>
      <main className="flex w-full flex-col items-center">
        <Hero />
        <Work />
        <About />
        <Approach />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
