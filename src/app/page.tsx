import { Nav } from "@/components/nav";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { About } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { Process } from "@/components/home/process";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center">
        <Hero />
        <Work />
        <About />
        <Approach />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
