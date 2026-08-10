import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CuratedWork } from "@/components/curated-work";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Nav />
      <Hero />
      <CuratedWork />
      <Footer
        image="/footer/magnifier.png"
        heading={
          <>
            If this work caught your attention, I&rsquo;d love to explore a
            role on your team
          </>
        }
        ptClassName="pt-16 sm:pt-20 md:pt-[220px]"
      />
    </div>
  );
}
