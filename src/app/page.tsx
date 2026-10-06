import { Nav } from "@/components/nav";
import { StickyNavReveal } from "@/components/sticky-nav-reveal";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { About } from "@/components/home/about";
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
        {/* TODO(process): The previous "My approach" and "My design process"
            sections were removed because their copy matched another designer's
            site. Write a new process section here in Muskan's own words, based
            on her real projects. Do not reuse or paraphrase the old copy. */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
